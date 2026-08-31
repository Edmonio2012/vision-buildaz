# WD Brown Speaker Site — Design QA

## Comparison target

- Source visual truth: `reference-evidence/youready-letsgrow-2026-08-31/desktop-1440x1000-full.png`, `reference-evidence/youready-letsgrow-2026-08-31/mobile-390x844-full.png`, `reference-evidence/youready-letsgrow-2026-08-31/mobile-390x844-menu-open.png`, and the matched top-of-page crops in `design-reference/`.
- Rendered implementation: `http://127.0.0.1:4173/`.
- Implementation screenshots: `qa-evidence/implementation-desktop-1440x1000-full.png`, `qa-evidence/implementation-desktop-1440x1000-top.png`, `qa-evidence/implementation-mobile-390x844-full.png`, `qa-evidence/implementation-mobile-390x844-top.png`, and `qa-evidence/implementation-mobile-390x844-menu-open.png`.
- Full-view paired evidence: `qa-evidence/source-implementation-comparison.png` and `qa-evidence/comparison.html`.
- Focused paired evidence: `qa-evidence/comparison-desktop-top.png`, `qa-evidence/comparison-mobile-top.png`, `qa-evidence/comparison-mobile-menu.png`, `qa-evidence/comparison-why.png`, `qa-evidence/comparison-testimonials.png`, `qa-evidence/comparison-meet.png`, `qa-evidence/comparison-books.png`, and `qa-evidence/comparison-contact.png`.

## Normalization and state

- Desktop source viewport: 1440 × 1000 CSS px at device scale factor 1. Full source capture: 1425 × 9478 px; top source crop: 1440 × 1000 px.
- Desktop implementation viewport: 1440 × 1000 CSS px at device scale factor 1. Full implementation capture: 1425 × 10535 px; top implementation crop: 1440 × 1000 px.
- Mobile source viewport: 390 × 844 CSS px at device scale factor 1. Full source capture: 390 × 12972 px; menu state: 390 × 844 px.
- Mobile implementation viewport: 390 × 844 CSS px at device scale factor 1. Full implementation capture: 390 × 14758 px; top and menu states: 390 × 844 px.
- No density normalization was required; all captures are 1×.
- Compared route `/`, default dark/light section theme, signed-out/public state, first hero message, mobile menu closed and open, and the same desktop/mobile breakpoints.
- The source full-page capture contains a stitched sticky-header artifact inside the Why WD crop. That artifact was excluded from fidelity findings; the source top and dedicated navigation captures were used for header judgment.

## Findings

No actionable P0, P1, or P2 differences remain.

### Required fidelity surfaces

- Fonts and typography: local Fraunces and Inter files reproduce the reference display/body pairing, hierarchy, weights, line heights, wrapping, and small uppercase labels. Hero, section titles, testimonial captions, bio copy, and CTA labels remain readable at both target widths.
- Spacing and layout rhythm: desktop hero proportions, section shells, four-card Why layout, three-column testimonial wall, bio grid, books grid, and contact split retain the source rhythm. The implementation is intentionally longer because it adds the requested reel placeholder and displays all four books without a carousel.
- Colors and visual tokens: navy, deep ink, paper, white, and restrained gold accents map to the reference. Borders, radii, card grounds, and quote rules were corrected in the final comparison pass.
- Image quality and asset fidelity: the approved arena hero is preserved locally. The disliked secondary synthetic stage image is not used. A reference-based stage image is used in the credibility area, and all logos, covers, portraits, thumbnails, and fonts are served locally rather than hotlinked. WD/team approval is still required for likeness and usage rights before public launch.
- Copy and content: reference copy is preserved where still approved, including all three hero messages and WD attribution. Brief-directed changes are intentional: four real testimonials replace pending tiles; books use one Amazon Author Central link; the reel has a clear production placeholder; and native signup/form handling is absent.
- Interaction and accessibility: hero messages are manual-only with complete grouped-button semantics and practical hit areas; the marquee has a pause/play control; the mobile menu is removed from the tab order when closed, moves focus into the menu, traps focus, closes with Escape, and returns focus to its trigger; the testimonial facade creates one privacy-enhanced YouTube iframe only after activation; reduced motion, visible focus, skip navigation, semantic main/H1, and descriptive control names are present.

## Intentional differences from the draft

- The source's clipped 390 px mobile CTA is corrected; the compact logo and Book WD action both remain visible.
- Pending testimonial placeholders are omitted until approved international/community testimonials arrive.
- Per-book purchase links and carousel controls are replaced by one Amazon Author Central link, as required.
- The native signup modal, Klaviyo behavior, and native form handling are removed.
- A speaker-reel production slot and a generated reference-based WD stage image are included to satisfy the current brief.
- Contact uses a clearly marked mailto fallback until `VITE_GHL_SPEAKER_INQUIRY_URL` is supplied; the page contains no native contact form or mailing system.

## Comparison history

1. Initial responsive comparison
   - Finding: the 390 px navigation CTA clipped and the open mobile menu did not fully own the viewport.
   - Fix: made the menu a full-width viewport overlay below the sticky header, locked body scroll, tightened the small-screen brand/action sizing, and retained the complete Book WD action.
   - Post-fix evidence: `qa-evidence/comparison-mobile-top.png` and `qa-evidence/comparison-mobile-menu.png`; implementation scroll width equals viewport width at both breakpoints.

2. Accessibility interaction pass
   - Findings: closed mobile-menu links remained focusable; Escape/focus return were missing; the hero rotated indefinitely; the marquee had no pause; hero dots used incomplete tab semantics and had small hit areas.
   - Fixes: conditionally render the open menu, add focus entry/containment/Escape/return, make hero selection manual, use grouped pressed buttons with 36 px controls, and add a marquee pause/play control.
   - Post-fix evidence: `qa-evidence/implementation-summary.json` records first-link focus, Escape closure, focus return, no closed menu in the DOM, manual hero selection, stopped auto-rotation, and paused marquee state.

3. Focused visual comparison
   - Findings: Why cards used filled gold/navy surfaces instead of the source's white cards with accent rules; testimonial alignment/cards/play controls drifted; bio thesis and quotes were oversized colored panels.
   - Fixes: restored white 14 px-radius Why cards with four top-rule accents, centered the testimonial header and matched the unboxed facade treatment, centered dark/gold play controls, and restored the source's compact left-rule bio quotes.
   - Post-fix evidence: `qa-evidence/comparison-why.png`, `qa-evidence/comparison-testimonials.png`, and `qa-evidence/comparison-meet.png`.

4. Final browser pass
   - Result: no P0/P1/P2 differences; no horizontal overflow at 1440 or 390; zero console errors and zero console warnings. Only Vite connection/debug and React development information messages were present.
   - Evidence: `qa-evidence/implementation-summary.json`, all paired crops listed above, and `qa-evidence/source-implementation-comparison.png`.

## Follow-up polish and launch inputs

- P3: Replace the temporary mailto inquiry fallback with the final GoHighLevel booking URL/embed.
- P3: Obtain WD/team written approval for generated likeness, wedding-ring accuracy, portraits, speaker-sheet claims, logos, book covers, testimonial releases, and all usage rights.
- P3: Confirm the production domain, reel/clip URLs, privacy/terms destinations, and final analytics/consent requirements before deployment.

## Implementation checklist

- [x] Source and implementation captured at matching desktop/mobile viewports.
- [x] Full-page and focused source/implementation pairs reviewed together.
- [x] P0/P1/P2 findings fixed and recaptured.
- [x] Production build passes.
- [x] Primary responsive and interaction states pass browser verification.
- [ ] Supply external launch inputs listed above.

final result: passed
