# Vicki Studio design system

Preserve the existing identity: near-black backgrounds, silver gradient display type, white service/pricing sections, rounded panels, purple 3D artwork, and restrained pill controls. Preserve the original body font stack: Figtree, Geist, Kanit, sans-serif. The bundled variable fonts use different family names, so the original design renders with Kanit (loaded in index.html). Do not substitute the variable font family names into the body token; that changes the original appearance. The root element retains Figtree Variable as before.

## Source of truth

- `src/styles/tokens.css`: canonical CSS values. Edit this first for visual changes.
- `src/design-system.ts`: typed CSS-variable aliases for React styles and reusable class recipes. Do not duplicate literal values here.
- `tailwind.config.js`: token-backed utilities and static responsive breakpoints.
- `src/index.css`: shared recipes and responsive behavior.

## Token families

| Family | Purpose |
| --- | --- |
| `--color-*` | Canvas, surfaces, text, accent, borders, controls and illustration colors |
| `--gradient-*`, `--shadow-*` | Display text, panels, loader, controls, cards and 3D artwork |
| `--font-*`, `--weight-*` | Font families and weights |
| `--text-*` | Fluid hero, section, number, service, body, price and contact type; fixed captions |
| `--leading-*`, `--tracking-*` | Reading rhythm and display/label tracking |
| `--space-*` | Quarter-rem-based spacing scale, mapped to Tailwind utilities |
| `--gutter`, `--section-space`, `--content-width`, `--reading-width`, `--grid-gap` | Shared layout rhythm and line lengths |
| `--radius-*`, `--card-padding` | Component and section geometry |
| `--control-height`, `--focus-*` | Touch targets and keyboard focus |
| `--duration-*`, `--ease-*`, `--layer-*` | Transitions and stacking |
| `--model-size`, `--project-ratio` | Responsive media geometry |

Component-specific illustration geometry and animation keyframes remain local: they describe artwork rather than reusable layout decisions. Add a named semantic token when introducing a new reusable visual choice; do not add anonymous numbered tokens.

## Layout recipes

Use `section-spacing` for section gutters and vertical padding. Add `section-shell` for rounded top corners. Inside sections, use `content-container` for the shared 80rem maximum width. Full-bleed section backgrounds and marquee strips remain unconstrained. Never override Tailwind's max-width utilities globally.

Use `button` for primary contact controls. ContactButton renders an email anchor by default, or a native button when given an onClick callback. Keep interactive targets at least 48px tall and preserve the focus-visible outline.

Use the existing `service-row`, `pricing-grid`, `project-card`, `project-media`, and `contact-detail` recipes rather than introducing parallel layout rules. Pricing cards stretch equally and their buttons sit at the bottom. Service numbers occupy a column sized from the number type token.

## Responsive rules

- Base: one column, wrapped contact details, hero description/action aligned to opposite bottom corners, no overlapping about decorations.
- 40rem / 640px (`sm`): existing small-screen spacing refinements.
- 48rem / 768px (`md`): the centered hero portrait overlaps the lower edge; About artwork moves from small paired rows into reserved side columns.
- 64rem / 1024px (`lg`): three pricing columns and the two-column contact section.
- 80rem / 1280px (`xl`), 96rem / 1536px (`2xl`): available expansion points; containers remain bounded.
- Sticky project stacking requires both 48rem width and 44rem height. Smaller/shorter viewports show naturally flowing cards.

CSS variables cannot be used in media-query conditions, so breakpoint literals are mirrored in CSS and Tailwind. Keep them synchronized.

## Maintenance checks

Run `npm run build`. Preview at 320, 390, 768, 1024, 1440 and 1920px widths, plus a short landscape viewport. Check document overflow, heading wrapping, service-number separation, card alignment, keyboard focus, fragment links, slow media loading and reduced motion. Preserve existing project sources and text unless explicitly asked to change them.

## Hero composition

Keep the original oversized greeting, full-width navigation, centered portrait anchored to the bottom, and description/action at opposite bottom corners. The hero deliberately uses the section gutters without the content-width cap. On phones, use a content-height hero with the portrait in normal flow directly below the greeting, separated by --hero-mobile-model-gap. Keep the controls below the portrait. Do not impose a viewport minimum height or bottom-anchor the mobile portrait: both create empty space above it. On short desktop screens, allow the hero to grow beyond the viewport. Hero-specific sizing tokens must not change the other sections.

## Spacing rhythm

Sections use 48–96px fluid vertical padding. Section heading-to-content gaps use --section-heading-gap (32–64px); about content uses --about-content-gap (24–40px). The about section is content-height, with no viewport or fixed minimum. The marquee uses 24–64px above and 16px below, preserving clearance for the desktop portrait. Service rows and project stacks have dedicated fluid spacing tokens. Avoid stacking large utilities on top of these recipes. Preserve media aspect ratios: letterboxing is intentional and should not be removed by cropping project artwork.

## Bulleted lists

Use `bullet-list`, `bullet-list-item`, and an aria-hidden `bullet-list-marker` for custom bullet lists. Marker size, text gap and row gap use the --list-* tokens. Markers center on the first line box using 1lh, so wrapped lines remain aligned with the text column. Avoid fixed top margins or vertically centering markers against the entire multiline item.

## Primary contact CTA

Contact Me uses a filled lavender gradient inspired by the existing purple 3D objects, dark plum text, a defined purple border and a restrained glow. Keep this treatment reserved for the main contact action. All instances inherit `.button`; do not set colors per section. Use `--color-button-*`, `--gradient-button*`, and `--shadow-button*` for default, hover, pressed, and focus treatments. Preserve the pill shape, current size and 48px minimum target. The focus ring has a white separator so it remains visible on dark and light surfaces. No pulsing or looping effects.

Research: [NN/g: Button States](https://www.nngroup.com/articles/button-states-communicate-interaction/) recommends strongest visual emphasis for primary actions and recognizable interaction states. [W3C: Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) specifies at least 4.5:1 for normal text. The default gradient stops have 7.78:1 and 10.66:1 text contrast; hover stops exceed 10:1, and the pressed state is 6.90:1. Verify the dark text against every gradient stop and pressed-state color when changing tokens.

## Interactive signature footer

The footer follows the supplied oversized-name reference: Vicki in dim charcoal at rest, a dark-gray-to-silver gradient on interaction, dense lavender pixel trails behind it, and copyright text centered beneath the centered name at every breakpoint. This replaces the previous navigation/brand-summary footer. The signature uses the same font stack, black weight and tight tracking as the hero greeting. Particle and glitch colors alias the Contact Me button tokens. The particle-area token controls density; stratified placement distributes the particles evenly. They remain visible below the Vicki name container, then fade as they rise through its lower 70% (--footer-particle-fade-travel). They become fully transparent at 30% down from the name container’s top. The measured name container, not the footer or animated glyph bounds, defines this fade region and is observed for responsive size changes. The hovered letters reuse --gradient-hero-text through --footer-name-gradient to match the contact heading.

Use --footer-* tokens for signature typography, colors, glow, height, particle speed and glitch duration. Hover, keyboard focus, or tap activates the effect. The glitch is a brief sliced overlay, not a repeating full-text flash. The particle canvas only runs while active, visible, and the browser tab is visible. Reduced motion preserves the static color change and hides animated layers. Resize and animation resources are cleaned up on deactivation/unmount.

The footer reuses DancingLetters in its inherited-color mode: each character dances on hover/tap, and the full name dances on activation or keyboard focus. Character spacing uses --footer-letter-gap, with zero negative tracking. Glitch overlays follow individual letters. Reduced motion preserves the same spaced layout without movement. The hero keeps its existing gradient mode.

## About crystal assets

The About section uses four generated transparent 3D renders: crescent moon, four-stud block, smiley ring, and pointer. All use lavender optical glass, polished iridescent edges and restrained cyan reflections. Assets live in `public/about`; PNGs are source masters and alpha-preserving WebP versions are served by the site. These are decorative renders, not interactive 3D meshes.

Use the `about-art-layout` grid to reserve side columns around the heading and copy. On phones, small pairs frame the content above and below without overlapping text. Sizes and float duration use --about-art-* tokens. Keep alt text empty, lazy loading enabled and reduced-motion support. Do not restore the former absolute-positioned CSS sculptures.
