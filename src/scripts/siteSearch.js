// Shared, bundled once and cached across Astro page transitions.
export const initializeSiteSearch = () => {

    const modal = document.querySelector("[data-search-modal]");
    if (!modal || modal.dataset.ready === "true") return;

    window.__siteSearchController?.abort();
    const listenerController = new AbortController();
    window.__siteSearchController = listenerController;
    const listenerOptions = { signal: listenerController.signal };

    modal.dataset.ready = "true";

    const input = modal.querySelector("[data-search-input]");
    const results = modal.querySelector("[data-search-results]");
    const status = modal.querySelector("[data-search-status]");
    const labels = JSON.parse(modal.dataset.labels || "{}");
    const lang = modal.dataset.lang || "en";
    const indexUrl = modal.dataset.indexUrl || "/search-index.json";
    const openButtons = document.querySelectorAll("[data-search-open]");
    const closeButtons = modal.querySelectorAll("[data-search-close]");
    const cacheKey = `${indexUrl}::${lang}`;
    const indexCache = window.__siteSearchIndexCache ||= new Map();
    let indexedItems = [];
    let indexPromise = indexCache.get(cacheKey);
    let previousFocus;
    let previousOverflow = "";
    let searchQueued = false;
    let searchRevision = 0;

    const escapeHtml = (value) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const normalize = (value) =>
      String(value ?? "")
        .toLocaleLowerCase()
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim();

    const prepareSearchItem = (item) => {
      if (typeof item.searchContent === "string") {
        const { searchContent, ...resultItem } = item;
        const fields = {
          title: normalize(item.title),
          description: normalize(item.description),
          category: normalize(item.category),
          tags: normalize((item.tags || []).join(" ")),
          content: searchContent,
          type: normalize(item.type),
          date: normalize(item.date),
          track: normalize(item.track),
          aliases: normalize((item.aliases || []).join(" ")),
        };
        return {
          ...resultItem,
          _search: {
            fields,
            semanticHaystack: Object.entries(fields)
              .filter(([field]) => field !== "date")
              .map(([, value]) => value)
              .join(" "),
          },
        };
      }

      const fields = {
        title: normalize(item.title),
        description: normalize(item.description),
        category: normalize(item.category),
        tags: normalize((item.tags || []).join(" ")),
        content: normalize(item.content || ""),
        type: normalize(item.type),
        date: normalize(item.date || ""),
        track: normalize(item.track || ""),
        aliases: normalize((item.aliases || []).join(" ")),
      };

      return {
        ...item,
        _search: {
          fields,
          semanticHaystack: Object.entries(fields)
            .filter(([field]) => field !== "date")
            .map(([, value]) => value)
            .join(" "),
        },
      };
    };

    const track = (eventName, props = {}) => {
      if (typeof window.trackSiteEvent === "function") {
        window.trackSiteEvent(eventName, props);
      }
    };

    const loadIndex = () => {
      if (!indexPromise) {
        indexPromise = fetch(indexUrl)
          .then((response) => {
            if (!response.ok) throw new Error("Search index unavailable");
            return response.json();
          })
          .then((items) => {
            const list = Array.isArray(items) ? items : [];
            indexedItems = list.filter((item) => item.language === lang).map(prepareSearchItem);
            return indexedItems;
          })
          .catch((error) => {
            indexCache.delete(cacheKey);
            indexPromise = undefined;
            throw error;
          });
        indexCache.set(cacheKey, indexPromise);
      }
      return indexPromise.then((items) => {
        indexedItems = items;
        return items;
      });
    };

    const tokenScore = (item, query, tokens) => {
      const { fields, semanticHaystack } = item._search;
      const missesRequiredToken = tokens.some((token) => {
        if (/^\d{4}$/.test(token)) {
          return !fields.date.includes(token) && !semanticHaystack.includes(token);
        }
        return !semanticHaystack.includes(token);
      });
      if (missesRequiredToken) return 0;

      let score = 0;

      if (fields.title.includes(query)) score += 34;
      if (fields.title === query) score += 70;
      else if (fields.title.startsWith(query)) score += 14;
      if (fields.tags.includes(query)) score += 22;
      if (fields.aliases.includes(query)) score += 20;
      if (fields.category.includes(query)) score += 16;
      if (fields.track.includes(query)) score += 14;
      if (fields.track === query) score += 90;
      if (fields.description.includes(query)) score += 12;
      if (fields.date.includes(query)) score += 6;
      if (fields.content.includes(query)) score += 4;

      for (const token of tokens) {
        if (fields.title.includes(token)) score += 12;
        if (fields.tags.includes(token)) score += 9;
        if (fields.aliases.includes(token)) score += 8;
        if (fields.category.includes(token)) score += 7;
        if (fields.track.includes(token)) score += 6;
        if (fields.description.includes(token)) score += 5;
        if (fields.date.includes(token)) score += 3;
        if (fields.content.includes(token)) score += 1;
      }

      return score > 0 ? score : 0;
    };

    const renderEmpty = () => {
      status.textContent = "";
      results.innerHTML = `
        <div class="site-search__state">
          <h3>${escapeHtml(labels.emptyTitle)}</h3>
          <p>${escapeHtml(labels.emptyDescription)}</p>
          <div class="site-search__chips">
            ${(labels.suggestions || [])
              .map((suggestion) => `<button class="site-search__chip" type="button" data-search-suggestion="${escapeHtml(suggestion)}">${escapeHtml(suggestion)}</button>`)
              .join("")}
          </div>
        </div>
      `;
    };

    const renderNoResults = () => {
      status.textContent = "";
      results.innerHTML = `
        <div class="site-search__state">
          <h3>${escapeHtml(labels.noResults)}</h3>
          <p>${escapeHtml(labels.emptyDescription)}</p>
        </div>
      `;
    };

    const renderLoading = () => {
      status.textContent = labels.loading || "";
    };

    const renderResults = (query) => {
      const trimmed = query.trim();
      if (!trimmed) {
        renderEmpty();
        return;
      }

      const normalizedQuery = normalize(trimmed);
      if (!normalizedQuery) { renderNoResults(); return; }
      const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
      const resultYear = (item) => {
        const match = String(item.date || "").match(/\d{4}/);
        return match ? +match[0] : 0;
      };
      const matches = indexedItems
        .map((item) => ({ item, score: tokenScore(item, normalizedQuery, tokens) }))
        .filter((match) => match.score > 0)
        .sort(
          (a, b) =>
            b.score - a.score ||
            resultYear(b.item) - resultYear(a.item) ||
            a.item.title.localeCompare(b.item.title),
        )
        .slice(0, 12)
        .map((match) => match.item);

      if (!matches.length) {
        renderNoResults();
        return;
      }

      status.textContent = `${matches.length} ${labels.resultCount}`;
      results.innerHTML = matches
        .map((item) => {
          const tags = (item.tags || [])
            .slice(0, 4)
            .map((tag) => `<span class="site-search__tag">#${escapeHtml(tag)}</span>`)
            .join("");
          const date = item.date
            ? `<span class="site-search__date">${escapeHtml(item.date)}</span>`
            : "";
          return `
            <a class="site-search__result" href="${escapeHtml(item.url)}" data-search-result data-search-result-type="${escapeHtml(item.type)}">
              <span class="site-search__result-top">
                <span class="site-search__type">${escapeHtml(labels.typeLabels?.[item.type] || item.type)}</span>
                ${date}
              </span>
              <span>
                <h3 class="site-search__result-title">${escapeHtml(item.title)}</h3>
                <p class="site-search__result-description">${escapeHtml(item.description)}</p>
              </span>
              <span class="site-search__result-bottom">
                <span class="site-search__tags">${tags}</span>
                <span class="site-search__open">${escapeHtml(labels.openLabels?.[item.type] || labels.open)}</span>
              </span>
            </a>
          `;
        })
        .join("");
    };

    const runSearch = () => {
      const revision = ++searchRevision;
      const query = input.value || "";
      if (!query.trim()) {
        renderEmpty();
        return;
      }
      if (indexedItems.length) { renderResults(query); return; }
      renderLoading();
      loadIndex()
        .then(() => {
          if (revision === searchRevision && !modal.hidden && modal.isConnected && !listenerController.signal.aborted) renderResults(query);
        })
        .catch(() => {
          if (revision === searchRevision && !modal.hidden && modal.isConnected && !listenerController.signal.aborted) renderNoResults();
        });
    };

    const scheduleSearch = () => {
      if (searchQueued) return;
      searchQueued = true;
      window.queueMicrotask(() => {
        searchQueued = false;
        runSearch();
      });
    };

    const openSearch = () => {
      if (!modal.hidden) return;
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      renderEmpty();
      track("Open Search", { language: lang });
      window.requestAnimationFrame(() => {
        if (listenerController.signal.aborted || modal.hidden || !modal.isConnected) return;
        input.focus();
        input.select();
      });
      loadIndex().then(() => {
        if (listenerController.signal.aborted || modal.hidden || !modal.isConnected) return;
        if (input.value.trim()) renderResults(input.value);
      }).catch(() => {
        status.textContent = "";
      });
    };

    const closeSearch = () => {
      searchRevision += 1;
      modal.hidden = true;
      document.body.style.overflow = previousOverflow;
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    };

    document.addEventListener("astro:before-swap", () => {
      if (!modal.hidden) document.body.style.overflow = previousOverflow;
      listenerController.abort();
    }, { once: true, ...listenerOptions });

    const scrollToCurrentHash = () => {
      const hash = window.location.hash.slice(1);
      const hashTarget = hash ? document.getElementById(decodeURIComponent(hash)) : null;
      if (!hashTarget) return;
      if (hashTarget.closest("[data-experience-panel]") || hashTarget.matches("[data-credit-card]")) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (listenerController.signal.aborted || !hashTarget.isConnected) return;
          hashTarget.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start",
          });
        });
      });
    };

    openButtons.forEach((button) => {
      button.addEventListener("click", openSearch, listenerOptions);
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeSearch, listenerOptions);
    });

    results.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const suggestion = target?.closest("[data-search-suggestion]");
      if (suggestion && results.contains(suggestion)) {
        input.value = suggestion.dataset.searchSuggestion || suggestion.textContent || "";
        scheduleSearch();
        input.focus();
        return;
      }
      const link = target?.closest("[data-search-result]");
      if (!link || !results.contains(link)) return;
      track("Click Search Result", {
        language: lang,
        type: link.dataset.searchResultType || "unknown",
      });

      const destination = new URL(link.href, window.location.href);
      const sameDocument =
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search;

      closeSearch();

      if (sameDocument && destination.hash) {
        const hash = decodeURIComponent(destination.hash.slice(1));
        const hashTarget = document.getElementById(hash);
        if (hashTarget) {
          event.preventDefault();
          window.history.pushState(window.history.state, "", destination);
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.requestAnimationFrame(() => {
            if (listenerController.signal.aborted || !hashTarget.isConnected) return;
            hashTarget.scrollIntoView({
              behavior: reducedMotion ? "auto" : "smooth",
              block: "start",
            });
          });
        }
      }
    }, listenerOptions);

    input.addEventListener("input", scheduleSearch, listenerOptions);
    input.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;
      const firstResult = results.querySelector("[data-search-result]");
      if (firstResult instanceof HTMLElement) {
        event.preventDefault();
        firstResult.focus();
      }
    }, listenerOptions);
    results.addEventListener("keydown", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-search-result]") : null;
      if (!(target instanceof HTMLElement)) return;
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const resultLinks = [...results.querySelectorAll("[data-search-result]")];
      const currentIndex = resultLinks.indexOf(target);
      if (currentIndex < 0 || !resultLinks.length) return;
      event.preventDefault();
      let nextIndex = currentIndex;
      if (event.key === "ArrowDown") nextIndex = Math.min(resultLinks.length - 1, currentIndex + 1);
      if (event.key === "ArrowUp") nextIndex = currentIndex === 0 ? -1 : currentIndex - 1;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = resultLinks.length - 1;
      if (nextIndex === -1) input.focus();
      else if (resultLinks[nextIndex] instanceof HTMLElement) resultLinks[nextIndex].focus();
    }, listenerOptions);
    window.addEventListener("hashchange", scrollToCurrentHash, listenerOptions);
    scrollToCurrentHash();

    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && !modal.hidden) {
        const focusable = [...modal.querySelectorAll('[role="dialog"] button, [role="dialog"] input, [role="dialog"] a[href]')]
          .filter(element => !element.disabled && element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
          event.preventDefault(); first?.focus();
        }
      }
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        if (modal.hidden) openSearch();
        return;
      }
      if (event.key === "Escape" && !modal.hidden) {
        closeSearch();
      }
    }, listenerOptions);
};

export function bindSiteSearch() {
  if (window.__siteSearchPageLoad) document.removeEventListener('astro:page-load', window.__siteSearchPageLoad);
  window.__siteSearchPageLoad = initializeSiteSearch;
  document.addEventListener('astro:page-load', initializeSiteSearch);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeSiteSearch, {once: true});
  else initializeSiteSearch();
}
