/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="node" />

interface Window {
  trackSiteEvent?: (name: string, props?: Record<string, unknown>) => void;
}

// The music controls intentionally use the global [hidden] rule on inline SVGs.
declare namespace astroHTML.JSX {
  interface SVGAttributes { hidden?: boolean; }
}
