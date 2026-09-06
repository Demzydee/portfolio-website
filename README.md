# Jack — 3D Creator Portfolio

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Notes

- All images are self-contained SVG placeholders generated in
  `src/lib/placeholder.ts` — no external image hosts are referenced, so the
  site works fully offline. Replace the `placeholderImg(...)` calls in
  `HeroSection.tsx`, `MarqueeSection.tsx`, `AboutSection.tsx`, and
  `ProjectsSection.tsx` with real `<img src="/assets/...">` paths once you
  have final artwork.
- Bio copy in `AboutSection.tsx` and service descriptions in
  `ServicesSection.tsx` are placeholder text — swap in your own.
- Build for production with `npm run build`.
