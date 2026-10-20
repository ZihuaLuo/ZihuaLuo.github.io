import { searchProjects } from "../data/searchProjects.ts";

export function addProjectMetadata(html: string, projectId: string, canonicalUrl: string): string {
  const project = searchProjects.find(project => project.id === projectId)?.direct;
  if (!project) throw new Error(`No public project page: ${projectId}`);
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Only touch the head. Embedded chart data and the self-contained game stay byte-for-byte intact.
  return html.replace(/<head>([\s\S]*?)<\/head>/i, (_, head: string) => {
    head = head.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi, "");
    head = head.replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/gi, "");
    return `<head>${head}<meta name="description" content="${escape(project.description)}" /><link rel="canonical" href="${escape(canonicalUrl)}" /></head>`;
  });
}
