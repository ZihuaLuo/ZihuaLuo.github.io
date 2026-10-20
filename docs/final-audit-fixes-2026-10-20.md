# Final audit repairs, 2026-10-20

The current visual design, project constellation, dashboard datasets, private retention overview, and self-contained Cloudline game are retained.

- Credits allocate listeners for each new page instance, so filtering survives Astro navigation.
- Credentials wrap at tablet widths without changing desktop card styling.
- Canadian electricity KPIs display compact M values with MWh units. The original figures ZIP is served on demand from the same site. Its SHA-256 remains `b4c3d779ca125425d0b4aafcd4a4fbae7304f24309dca102daed86de12d730e8`; all 366 entries pass ZIP CRC validation.
- The six public project pages have canonical URLs and descriptions and appear in the sitemap. The private retention dashboard remains excluded. Legacy project heading levels are corrected with their original visual styles.
- Search distinguishes a failed index request from zero matches, offers retry, and makes background content inert while open. Previous inert states are restored on close or navigation.
- Release documentation describes the actual home route and search sources.

## Dependency maintenance

Astro stays on the 7.3 patch line and Tailwind stays on version 3. Compatible transitive updates address devalue, fast-uri, http-cache-semantics, sharp, smol-toml, and source-map-js advisories. `postcss-selector-parser` is overridden to 7.1.7, with a production CSS comparison and browser verification required because its parents still request version 6.

There is no upstream patched release for [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). `scripts/harden-braces.cjs` applies a temporary 128-level guard to the braces 3.0.3 parser and recursive AST walkers after installation. It fails on an unexpected upstream version or source layout. Regression tests cover deeply nested strings and ASTs, ordinary extension patterns, ranges, escapes, and nested expressions. A clean lockfile install also runs this patch. The affected package is build tooling; it is not shipped as a public Node server. npm audit will still report braces and its dependent parents by their upstream version. This is a local mitigation, not an upstream resolution or a claim of zero advisories. Remove the patch after a verified upstream fix is available.

## Verification boundaries

Automated production validation covers types, unit regressions, internal links, search targets, canonical URLs, sitemap inclusion, headings, and dashboard download/unit regressions. Browser checks cover credits reentry, search pagination and retry, keyboard/dialog behaviour, tablet credential wrapping, project entry points, and the retained dashboard interactions. Responsive browser emulation does not substitute for physical phone or screen-reader testing.

## Recorded results

- Astro check: 75 files, zero errors, warnings, or hints.
- Node tests: 98 passed, zero failed.
- Production artifact: 203 HTML pages, 404 search entries, 6,144 local links, zero validation errors.
- Clean npm lockfile installation succeeded and applied the braces guard automatically.
- Global Tailwind/PostCSS CSS is byte-identical with selector parser 6.1.4 and 7.1.7 (SHA-256 `83c3eb2af3837e8e4bb2bdf2b95606c8958fec4e19810e0855c8fc0b35fe17e4`).
- Official npm advisory bulk check now reports only braces; its upstream version still matches the advisory despite the installed local mitigation. Seven other affected package names no longer match.
- Dashboard chart scripts are unchanged. The Cloudline source file is entirely unchanged.
- Credentials show no clipped titles/descriptions at 320, 390, 720, 768, 820, 1024, and 1440 pixels.
- Credits filter returns one match and hides 35 nonmatches after navigating away and back. Search exposes all 66 fund results and recovers from an intentional HTTP 503 through its retry button. All seven project openers work; retention has no visible dashboard link.
