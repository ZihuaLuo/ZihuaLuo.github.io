/** Keep project navigation usable when WebGL is unavailable or cannot initialize. */
export function initializeLabFallback(lab: HTMLElement) {
  lab.dataset.renderFallback = "true";
  const notice = lab.querySelector<HTMLElement>("[data-webgl-fallback]");
  const panel = lab.querySelector<HTMLDialogElement>("[data-project-detail-panel]");
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
    buttons.forEach(item => item.setAttribute("aria-expanded", String(item === button)));
    panel.hidden = false;
    if (!panel.open) panel.showModal();
    const body = panel.querySelector<HTMLElement>(".ai-lab__detail-body");
    if (body) { body.scrollTop = 0; body.scrollLeft = 0; }
    lab.dataset.panelOpen = "true";
    const url = new URL(window.location.href);
    url.searchParams.set("project", button.dataset.projectId ?? "");
    window.history.replaceState(window.history.state, "", url);
    close.focus({ preventScroll: true });
  };
  const dismiss = () => {
    panel.close();
    panel.hidden = true;
    delete lab.dataset.panelOpen;
    buttons.forEach(item => item.setAttribute("aria-expanded", "false"));
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(window.history.state, "", url);
    selected?.focus({ preventScroll: true });
  };
  buttons.forEach(button => button.addEventListener("click", () => open(button), options));
  close.addEventListener("click", dismiss, options);
  panel.addEventListener("cancel", event => {
    event.preventDefault();
    dismiss();
  }, options);
  document.addEventListener("astro:before-swap", () => {
    if (panel.open) panel.close();
    panel.hidden = true;
    controller.abort();
  }, { once: true, ...options });
  const projectId = new URL(window.location.href).searchParams.get("project");
  const target = buttons.find(button => button.dataset.projectId === projectId);
  if (target) open(target);
}
