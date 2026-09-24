import data from "../data/noncompete.json";

const root = document.querySelector<HTMLElement>("[data-noncompete-dashboard]");

if (root) {
  const svgNS = "http://www.w3.org/2000/svg";
  const timeline = root.querySelector<SVGSVGElement>("[data-timeline]")!;
  const featureBars = root.querySelector<HTMLElement>("[data-feature-bars]")!;
  const themeBars = root.querySelector<HTMLElement>("[data-theme-bars]")!;
  const matrix = root.querySelector<HTMLTableElement>("[data-period-matrix]")!;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-period]")];
  let selected = "all";

  const appendSvg = (parent: SVGElement, tag: string, attributes: Record<string, string>, content?: string) => {
    const node = document.createElementNS(svgNS, tag);
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
    if (content !== undefined) node.textContent = content;
    parent.append(node);
    return node;
  };
  const pct = (count: number, total: number) => total ? Math.round(count / total * 100) : 0;
  const period = () => data.periods.find((item) => item.name === selected);
  const valueFor = (rows: { period: string; filings: number }[], name: string, field: "feature" | "theme") =>
    rows.find((item) => item.period === selected && (item as unknown as Record<string, string>)[field] === name)?.filings ?? 0;

  function renderTimeline() {
    timeline.replaceChildren();
    const baseline = 248, left = 44, width = 936, max = 15;
    for (const tick of [0, 5, 10, 15]) {
      const y = baseline - tick / max * 210;
      appendSvg(timeline, "line", { x1: String(left), y1: String(y), x2: "980", y2: String(y), stroke: "#e5e8f0", "stroke-width": "1" });
      appendSvg(timeline, "text", { x: "32", y: String(y + 4), fill: "#8390a2", "font-size": "12", "text-anchor": "end" }, String(tick));
    }
    const step = width / data.annual.length;
    data.annual.forEach(({ year, filings }, index) => {
      const x = left + index * step + 3;
      const barHeight = Math.max(filings / max * 210, filings ? 3 : 0);
      const active = selected === "all" || (period() && year >= period()!.startYear && year <= period()!.endYear);
      const bar = appendSvg(timeline, "rect", {
        x: String(x), y: String(baseline - barHeight), width: String(Math.max(step - 6, 4)), height: String(barHeight),
        rx: "2", fill: active ? "#775bbd" : "#d9dce6", opacity: active ? "1" : ".75",
      });
      appendSvg(bar, "title", {}, `${year}: ${filings} sampled filing snippets`);
      if (index % 5 === 0 || index === data.annual.length - 1) {
        appendSvg(timeline, "text", { x: String(x + (step - 6) / 2), y: "272", fill: "#657188", "font-size": "12", "text-anchor": "middle" }, String(year));
      }
    });
    appendSvg(timeline, "text", { x: "978", y: "18", fill: "#7a6aa3", "font-size": "12", "text-anchor": "end" }, "FILING YEAR");
  }

  function renderFeatures() {
    const total = period()?.filings ?? data.meta.filings;
    featureBars.replaceChildren();
    data.features.forEach(({ name, filings }) => {
      const count = selected === "all" ? filings : valueFor(data.periodFeatures, name, "feature");
      const share = pct(count, total);
      const row = document.createElement("div"); row.className = "bar-row";
      row.title = `${name}: ${count} of ${total} sampled filings (${share}%)`;
      const label = document.createElement("span"); label.className = "bar-name"; label.textContent = name;
      const track = document.createElement("span"); track.className = "bar-track";
      const fill = document.createElement("span"); fill.className = "bar-fill"; fill.style.width = `${share}%`; track.append(fill);
      const value = document.createElement("span"); value.className = "bar-value"; value.textContent = `${count} · ${share}%`;
      row.append(label, track, value); featureBars.append(row);
    });
  }

  function renderThemes() {
    const total = period()?.filings ?? data.meta.filings;
    themeBars.replaceChildren();
    data.typeThemes.forEach(({ name, filings }) => {
      const count = selected === "all" ? filings : valueFor(data.periodThemes, name, "theme");
      const row = document.createElement("div"); row.className = "theme-row";
      const top = document.createElement("div"); top.className = "theme-row__top";
      const label = document.createElement("strong"); label.textContent = name;
      const value = document.createElement("span"); value.textContent = String(count);
      top.append(label, value);
      const track = document.createElement("div"); track.className = "bar-track";
      const fill = document.createElement("span"); fill.className = "bar-fill"; fill.style.width = `${pct(count, total)}%`;
      track.append(fill);
      const note = document.createElement("small"); note.textContent = `${pct(count, total)}% of ${total} sampled filings`;
      row.append(top, track, note); themeBars.append(row);
    });
  }

  function renderMatrix() {
    matrix.replaceChildren();
    const head = matrix.createTHead().insertRow();
    const empty = document.createElement("th"); empty.scope = "col"; empty.textContent = "Feature"; head.append(empty);
    for (const item of data.periods) {
      const cell = document.createElement("th"); cell.scope = "col";
      cell.textContent = `${item.name} (n=${item.filings})`; head.append(cell);
    }
    const body = matrix.createTBody();
    for (const feature of data.features.slice(0, 6)) {
      const row = body.insertRow();
      const label = document.createElement("th"); label.scope = "row"; label.textContent = feature.name; row.append(label);
      for (const item of data.periods) {
        const count = data.periodFeatures.find((entry) => entry.period === item.name && entry.feature === feature.name)?.filings ?? 0;
        const share = pct(count, item.filings);
        const cell = row.insertCell(); cell.style.background = `rgba(119, 91, 189, ${0.07 + share / 100 * 0.45})`;
        const number = document.createElement("b"); number.textContent = `${share}%`;
        const detail = document.createElement("small"); detail.textContent = `${count} filings`;
        cell.append(number, detail);
      }
    }
  }

  function render() {
    const current = period();
    const metrics = current ?? data.meta;
    root!.querySelector<HTMLElement>("[data-kpi-filings]")!.textContent = String(metrics.filings);
    root!.querySelector<HTMLElement>("[data-kpi-annotations]")!.textContent = metrics.annotationRows.toLocaleString("en-US");
    root!.querySelector<HTMLElement>("[data-kpi-type]")!.textContent = String(metrics.typeAnnotatedFilings);
    root!.querySelector<HTMLElement>("[data-kpi-exclusion]")!.textContent = String(metrics.exclusionNoteFilings);
    root!.querySelector<HTMLElement>("[data-selection-line]")!.textContent = current ? `Showing filing years ${current.name} · ${current.filings} sampled snippets` : "All sampled filing years";
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.period === selected)));
    renderTimeline(); renderFeatures(); renderThemes();
  }

  buttons.forEach((button) => button.addEventListener("click", () => { selected = button.dataset.period ?? "all"; render(); }));
  renderMatrix(); render();
}
