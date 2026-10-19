/** Keep project navigation usable when WebGL is unavailable or cannot initialize. */
export function initializeLabFallback(lab: HTMLElement) {
  lab.dataset.renderFallback = "true";
  const notice = lab.querySelector<HTMLElement>("[data-webgl-fallback]");
  const panel = lab.querySelector<HTMLElement>("[data-project-detail-panel]");
  const title = lab.querySelector<HTMLElement>("[data-detail-title]");
  const close = lab.querySelector<HTMLButtonElement>("[data-detail-close]");
  const buttons = [...lab.querySelectorAll<HTMLButtonElement>("[data-project-node]")];
  if (notice) notice.hidden = false;
  if (!panel || !title || !close) return;
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let selected: HTMLButtonElement | undefined;
  const open = (button: HTMLButtonElement) => {
    selected = button;
    title.textContent = button.dataset.projectTitle ?? "Project";
    panel.querySelectorAll<HTMLElement>("[data-detail-project]").forEach((detail) => {
      detail.hidden = detail.dataset.detailProject !== (["canadian-electricity", "retention-lab", "fund-similarity", "cloudline", "finance-phd-eda", "corporate-scandal", "noncompete-10k"].includes(button.dataset.projectId ?? "") ? button.dataset.projectId : "pending");
    });
    buttons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    panel.hidden = false;
    lab.dataset.panelOpen = "true";
    const url = new URL(window.location.href);
    url.searchParams.set("project", button.dataset.projectId ?? "");
    window.history.replaceState(window.history.state, "", url);
    close.focus({ preventScroll: true });
  };
  const dismiss = () => {
    panel.hidden = true;
    delete lab.dataset.panelOpen;
    buttons.forEach(item => item.setAttribute("aria-pressed", "false"));
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(window.history.state, "", url);
    selected?.focus({ preventScroll: true });
  };
  buttons.forEach(button => button.addEventListener("click", () => open(button), options));
  close.addEventListener("click", dismiss, options);
  lab.addEventListener("keydown", event => {
    if (panel.hidden) return;
    if (event.key === "Escape") dismiss();
    if (event.key !== "Tab") return;
    const focusable = [...panel.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]")]
      .filter((element) => !element.closest("[hidden]"));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }, options);
  document.addEventListener("astro:before-swap", () => controller.abort(), { once: true, ...options });
  const projectId = new URL(window.location.href).searchParams.get("project");
  const target = buttons.find(button => button.dataset.projectId === projectId);
  if (target) open(target);
}
