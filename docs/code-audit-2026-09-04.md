# Website code and performance audit — 2026-09-04

## Scope and preservation

Reviewed the shared layout, routing, content collections, search, About controls/audio, Experience tabs, Credits filtering, chatbot matcher, AI Lab rendering/shaders/flight logic, assets, dependencies, and release workflow. This is a code/performance pass, not a visual redesign.

The release includes the previously requested, locally pending AI Lab, chatbot, navigation and The Cut branding updates. This pass preserves the current three planets, black hole, six-second one-shot scan, grouped planet/title appearance, star twinkle, project placeholders, robot appearance, and two-second answer reveal. Approved essays, experience records, donations, downloads, and the soundtrack were not rewritten or removed.

## Findings and changes

| Area | Finding | Resolution |
| --- | --- | --- |
| Animation lifecycle | Canvas RAF work continued when the scene was offscreen; reduced-motion still paid for continuous WebGL rendering. | Shared visibility-aware scheduler; pause offscreen, on hidden tabs and behind the project dialog; reduced-motion renders only on demand. Visible-time clock avoids a resume-time jump. |
| GPU resources | Disposing the renderer/composers did not release all scene textures and individual postprocessing passes. | Explicit pass, texture, material and geometry cleanup, deduplicated for shared resources; disconnect observers and abort scene listeners on route changes. |
| Render resolution | A forced minimum 1.5 DPR supersampled lower-DPR screens. | Respect native DPR with the existing upper caps. CSS sizes, meshes, effects and shader settings stay unchanged. |
| Particle background | Every pair used an expensive distance calculation; per-frame motion varied by screen refresh rate. | Squared-distance rejection and time-scaled movement; shared visible-loop ownership. |
| Chat | Response timers and RAF callbacks could outlive the page; typing repeatedly wrote to the whole page's scroll position; clipped robots kept animating. | Owned task scope, cancellation on navigation, transcript-only scrolling, offscreen message animation pause, removed obsolete trigger handlers. |
| Chat matcher | Every query renormalized the same topic keywords and phrases. | Prepare immutable matching data once; keep all responses and navigation unchanged. |
| Search | A roughly 14.8 KB inline script was copied into every HTML page; old async requests could replace newer results; repeated initialization could abort live handlers. | Cached bundled module, initialization guard before cleanup, response revision checks, disconnected-page guards and keyboard focus containment. |
| Persistent audio / tabs / credits | Global events could retain detached page controls. | Abort page-local handlers and cancel delayed work on navigation; retain audio playback across routes. Only the About player requests audio metadata, instead of preloading on every fresh route. |
| No-WebGL devices | A fallback notice existed, but project controls were clipped and unbound. | Functional fallback buttons, deep links, accessible project dialog and close handling. Keyboard controls remain available with WebGL too. |
| Obsolete implementation | Hidden visual-comparison markup downloaded an unused reference image; retired neural/button CSS and a smile robot variant remained locally. | Remove comparison-only UI and approximately 4.5 KB of dead CSS; archive two retired images outside the public build. |
| Framework / checks | Dependency advisories and previously unchecked type inconsistencies. | Astro 7.3.1 / MDX 8, patched transitive dependencies, explicit legacy Markdown processor and HTML spacing behavior; zero type errors, warnings or hints. Keep Three and Tailwind visual behavior. |
| Delivery | Build success alone did not check contracts or generated navigation. | Node regression suite, built-artifact validator and a CI validation gate before Pages deployment. |

Framework compatibility decisions follow the [official Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/). The workflow uses the supported [Astro deployment action inputs](https://github.com/withastro/action/blob/main/action.yml).

## Measured results

Measurements compare the locally saved pre-audit build with the optimized build, not an unrelated Lighthouse score.

| Measurement | Before | After |
| --- | ---: | ---: |
| Generated HTML across 196 pages | 8,977,970 bytes | 6,158,167 bytes |
| AI Lab canvas backing buffer at the tested desktop DPR | 822 × 712 | 685 × 593 |
| AI Lab CSS size at that viewport | 546.45 × 473.16 | unchanged |
| Retired public images in deployment | 1,713,411 bytes | 0 |
| Known dependency advisories in `npm audit` | 10 | 0 at audit time |

The HTML reduction is approximately 2.82 MB / 31.4% (uncompressed). It is a whole-build storage/transfer opportunity, not the saving on one page. AI Lab backing-pixel count is approximately 30.6% lower on the tested display; this is not a claim of 30.6% higher FPS. The 842,485-byte hidden reference image was confirmed loaded by the original AI page and is absent from the updated DOM/build.

## Verification

- `npm run validate`: passed — type checking, 56 regression tests, 196-page static build and artifact validation.
- 357 search entries and 5,287 local URL/asset/anchor references resolve in the generated build; no duplicate HTML IDs detected.
- 626 unique chatbot queries compared against saved pre-optimization answers: identical response text, topic selection and navigation links.
- Main-content text comparison across all generated pages: every non-AI page unchanged. AI text changes are removal of obsolete display/comparison labels, as requested earlier.
- Actual desktop and mobile browser checks: About appearance, shared navigation, Writing archive/series, Experience tracks, Credits person filter, Search → chatbot deep link → Writing, email → Let's Connect, six-second scan ending in STABLE, planet click → coming-soon dialog → close, chat completion and internal scrolling, offscreen scene pausing, music play/pause across navigation.
- Browser errors: none observed in the tested flows. At mobile width there was no horizontal document overflow.
- No-WebGL behavior, resource disposal, frame cancellation, hidden-tab resumption and reduced-motion scheduling also have targeted unit coverage.

## Limits and maintenance

- The WebGL scene intentionally remains visually rich. Its Three.js renderer bundle still triggers Vite's 500 KB chunk-size advisory. It is scoped to the AI page; reducing it further by replacing the renderer or removing effects would be a separate design/performance tradeoff.
- This pass does not claim a measured battery improvement, universal FPS target, mobile hardware benchmark, exhaustive accessibility certification, or immunity to every future dependency issue. No hardware-throttled Lighthouse score was used as evidence.
- Browser tests cover representative routes, with all generated local links checked automatically. External social links and third-party font/analytics service availability are outside that guarantee.
- Local baseline/source snapshots and the two retired images remain recoverable under ignored `qa/audit-baseline/`. That archive and private environment configuration are excluded from GitHub and deployment.
- Use `npm run validate` for future edits and repeat `npm audit` periodically. Add keyword/navigation tests when editing chatbot topics, and keep project IDs synchronized with search entries.
