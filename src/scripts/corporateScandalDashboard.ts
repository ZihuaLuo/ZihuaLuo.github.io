import data from "../data/corporateScandal.json";

type Category = (typeof data.categories)[number];
type Action = (typeof data.actions)[number];

const root = document.querySelector<HTMLElement>("[data-scandal-dashboard]");

if (root) {
  const categories = root.querySelector<HTMLElement>("[data-categories]")!;
  const actions = root.querySelector<HTMLElement>("[data-actions]")!;
  const timeline = root.querySelector<SVGSVGElement>("[data-timeline]")!;
  const matrix = root.querySelector<HTMLTableElement>("[data-matrix]")!;
  const reset = root.querySelector<HTMLButtonElement>("[data-reset-filter]")!;
  const selectionLine = root.querySelector<HTMLElement>("[data-selection-line]")!;
  const casesKpi = root.querySelector<HTMLElement>("[data-kpi-cases]")!;
  const recordsKpi = root.querySelector<HTMLElement>("[data-kpi-records]")!;
  const classifiedKpi = root.querySelector<HTMLElement>("[data-kpi-classified]")!;
  const format = new Intl.NumberFormat("en-US");
  const shortAction = (label: string) => ({
    "Investigation & Audit (Independent Investigator/Auditor Hired)": "Independent investigation",
    "Investigation & Audit (Internal)": "Internal investigation",
    "Public Acknowledgement / Apology": "Public acknowledgement",
    "Settlement & Corrective Measures": "Settlement + corrective",
    "Employee Training & Cultural Change": "Training / culture change",
  })[label] ?? label;
  let selectedCategory: string | null = null;

  const addSvg = (tag: string, attributes: Record<string, string | number>, parent: SVGElement = timeline) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, String(value));
    parent.append(element);
    return element;
  };

  const renderTimeline = () => {
    timeline.replaceChildren();
    const years = Array.from({ length: 27 }, (_, index) => 1998 + index);
    const counts = years.map((year) => data.annual
      .filter((item) => item.year === year && (!selectedCategory || item.category === selectedCategory))
      .reduce((sum, item) => sum + item.records, 0));
    const maximum = Math.max(...counts, 5);
    const ceiling = Math.ceil(maximum / 20) * 20;
    const left = 48;
    const top = 18;
    const chartWidth = 928;
    const chartHeight = 255;
    const baseline = top + chartHeight;

    for (let tick = 0; tick <= ceiling; tick += 20) {
      const y = baseline - (tick / ceiling) * chartHeight;
      addSvg("line", { x1: left, y1: y, x2: left + chartWidth, y2: y, stroke: "#dce8e7", "stroke-width": 1 });
      const label = addSvg("text", { x: left - 10, y: y + 4, "text-anchor": "end", fill: "#647985", "font-size": 12 });
      label.textContent = String(tick);
    }
    const slot = chartWidth / years.length;
    counts.forEach((count, index) => {
      const x = left + index * slot + slot * 0.17;
      const height = count / ceiling * chartHeight;
      const bar = addSvg("rect", {
        x, y: baseline - height, width: slot * 0.66, height: Math.max(0, height), rx: 3,
        fill: selectedCategory ? "#df8759" : "#38a7a6",
      });
      const title = addSvg("title", {}, bar);
      title.textContent = `${years[index]}: ${format.format(count)} coded records`;
      if (index % 4 === 0 || index === years.length - 1) {
        const label = addSvg("text", { x: left + index * slot + slot / 2, y: baseline + 25, "text-anchor": "middle", fill: "#647985", "font-size": 12 });
        label.textContent = String(years[index]);
      }
    });
    timeline.setAttribute("aria-label", `${selectedCategory ?? "All categories"}: annual coded records from 1998 to 2024, highest year ${years[counts.indexOf(Math.max(...counts))]} with ${Math.max(...counts)} records`);
  };

  const barRow = (label: string, count: number, maximum: number, kind: "category" | "action") => {
    const row = document.createElement(kind === "category" ? "button" : "div");
    row.className = `bar-row ${kind === "category" ? "bar-row--button" : "bar-row--action"}`;
    const name = document.createElement("span");
    name.className = "bar-label";
    name.textContent = label;
    const track = document.createElement("span");
    track.className = "bar-track";
    const fill = document.createElement("span");
    fill.className = "bar-fill";
    fill.style.width = `${count / maximum * 100}%`;
    track.append(fill);
    const value = document.createElement("span");
    value.className = "bar-value";
    value.textContent = format.format(count);
    row.append(name, track, value);
    return row;
  };

  const renderCategories = () => {
    categories.replaceChildren();
    const maximum = data.categories[0]?.cases || 1;
    data.categories.forEach((item: Category) => {
      const row = barRow(item.name, item.cases, maximum, "category") as HTMLButtonElement;
      row.type = "button";
      row.setAttribute("aria-label", `${item.name}: ${item.cases} ${item.cases === 1 ? "case" : "cases"}. Select to filter other charts.`);
      row.dataset.category = item.name;
      row.addEventListener("click", () => {
        selectedCategory = selectedCategory === item.name ? null : item.name;
        render();
      });
      categories.append(row);
    });
  };

  const renderActions = () => {
    actions.replaceChildren();
    const entries = data.actions.map((item: Action) => ({
      name: item.name,
      records: selectedCategory
        ? data.actionCategory.find((row) => row.category === selectedCategory && row.action === item.name)?.records ?? 0
        : item.records,
    })).filter((item) => item.records > 0).sort((a, b) => b.records - a.records);
    const maximum = entries[0]?.records || 1;
    entries.forEach((item) => {
      const row = barRow(shortAction(item.name), item.records, maximum, "action");
      row.title = item.name;
      actions.append(row);
    });
    if (entries.length === 0) {
      const message = document.createElement("p");
      message.className = "empty-state";
      message.textContent = "No coded actions in this selection.";
      actions.append(message);
    }
  };

  const renderMatrix = () => {
    matrix.replaceChildren();
    const columns = data.actions.filter((item) => !["Initial Accusation", "Unclassified"].includes(item.name)).slice(0, 6);
    const rows = data.categories.slice(0, 5);
    const header = document.createElement("thead");
    const headingRow = document.createElement("tr");
    const corner = document.createElement("th");
    corner.scope = "col";
    corner.textContent = "Scandal category";
    headingRow.append(corner);
    columns.forEach((action) => {
      const cell = document.createElement("th");
      cell.scope = "col";
      cell.textContent = shortAction(action.name);
      cell.title = action.name;
      headingRow.append(cell);
    });
    header.append(headingRow);
    const body = document.createElement("tbody");
    rows.forEach((category) => {
      const row = document.createElement("tr");
      const label = document.createElement("th");
      label.scope = "row";
      label.textContent = category.name;
      row.append(label);
      const values = columns.map((action) => data.actionCategory.find((item) => item.category === category.name && item.action === action.name)?.records ?? 0);
      const maximum = Math.max(...values, 1);
      values.forEach((value) => {
        const cell = document.createElement("td");
        const strength = value / maximum;
        cell.style.background = `rgba(7, 127, 129, ${0.07 + strength * 0.8})`;
        cell.style.color = strength > 0.5 ? "#fff" : "#284a55";
        cell.textContent = format.format(value);
        row.append(cell);
      });
      body.append(row);
    });
    matrix.append(header, body);
  };

  const render = () => {
    const category = data.categories.find((item) => item.name === selectedCategory);
    casesKpi.textContent = format.format(category?.cases ?? data.meta.cases);
    recordsKpi.textContent = format.format(category?.records ?? data.meta.codedRecords);
    classifiedKpi.textContent = format.format(selectedCategory
      ? data.actionCategory.filter((item) => item.category === selectedCategory && item.action !== "Unclassified").reduce((sum, item) => sum + item.records, 0)
      : data.meta.classifiedRecords);
    selectionLine.textContent = selectedCategory ? `Viewing: ${selectedCategory}` : "All scandal categories";
    reset.hidden = !selectedCategory;
    categories.querySelectorAll<HTMLButtonElement>("[data-category]").forEach((button) => {
      const selected = button.dataset.category === selectedCategory;
      button.setAttribute("aria-current", String(selected));
      const item = data.categories.find((item) => item.name === button.dataset.category)!;
      button.setAttribute("aria-label", `${item.name}: ${item.cases} ${item.cases === 1 ? "case" : "cases"}. ${selected ? "Current filter. Activate to show all categories." : "Filter the timeline and action mix by this category."}`);
    });
    renderActions();
    renderTimeline();
  };

  reset.addEventListener("click", () => {
    selectedCategory = null;
    render();
    categories.querySelector<HTMLButtonElement>("[data-category]")?.focus({ preventScroll: true });
  });
  renderCategories();
  renderMatrix();
  render();
}
