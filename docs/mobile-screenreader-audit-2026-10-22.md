# Mobile and assistive-technology review, 2026-10-22

Site: https://zihualuo.github.io/
Baseline: 624863e. Existing visual design, backgrounds, constellation geometry, project content, and chat typing animation are retained.

## Scope and evidence

Current-run screenshots and measurements are saved locally under the ignored `qa/mobile-screenreader-2026-10-22/` folder. Browser checks use Chromium at 320×568, 390×844, 390×400, 430×932, and 844×390. The short viewport approximates reduced usable height; it does not emulate a real software keyboard.

1. **Planet selection:** all seven planets opened the correct project through actual screenshot-based pointer coordinates at the mobile viewport. Keyboard openers and the named native dialog remain available. The private retention project exposes no dashboard links.
2. **Project dialog:** reproduced retained scroll position when reopening the long fund overview. Both WebGL and fallback paths now reset the body to the top. The body is a named, keyboard-focusable scroll region. Page Down reaches the bottom; the close button remains visible and measures 44px high at all tested sizes. No horizontal overflow was measured.
3. **Chat:** reproduced the old reply completion stealing focus back to the input after the user moved away. Busy input is now read-only rather than disabled, and completion does not move focus. The conversation is a named, keyboard-scrollable polite log, batches animated reply updates with aria-busy, and has a separate preparing-reply status. Users can scroll back through history without every typing frame forcing them to the bottom. Enter submits; the input declares the mobile Send key. Landscape-sized phones also receive a 16px input font (the previous 844×390 layout used 13.12px). Intro and animated response text have one complete accessible text equivalent. Existing visual animation and response content remain intact.
4. **Long reading:** the long heading and body fit at 320px; body text is 16.96px with a 31.55px line height. Dark/Light choices and next-article continuation work, and Light persists across navigation. All 173 generated article heading sequences were checked without level jumps. No reading layout change was needed.

## Regression checks

- 99 Node tests pass, including a behavioural regression for focus preservation, pending-request deduplication, accessible reply batching, history scrolling, and cleanup.
- The fallback project test also verifies scroll reset after a previous position.
- Production verification guards the named project scroll region, conversation log, and input association.
- Astro check: 75 files, zero errors/warnings/hints. Production build and validation: 203 HTML pages, 404 search entries, 6,144 local links, zero errors.

## Limits

Accessibility evidence consists of browser accessibility-tree inspection, source semantics, keyboard actions, screenshots, and event-driven regression tests. The current environment has no controllable native screen-reader surface or installed NVDA at the checked standard locations. No real NVDA/Narrator speech output, iOS VoiceOver, Android TalkBack, physical touch gestures, Safari behaviour, real keyboard occlusion, or screen-reader speech timing was validated. This report is not a claim of WCAG conformance or physical-device certification.

References: https://www.w3.org/TR/wai-aria-1.2/#log and https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/.
