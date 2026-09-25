import DancingLetters from './ui/dancing-letters';
import { useEffect, useRef, useState } from 'react';

/** One canvas keeps the rising pixel field out of the accessibility/DOM tree. */
function RisingPixels({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !active) return;

    const nameContainer = canvas.parentElement?.querySelector<HTMLElement>('.signature-name');
    if (!nameContainer) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let fadeStart = 0;
    let fadeEnd = 0;
    let lastTime = 0;
    let travel = 0;
    let pixels: { x: number; y: number; speed: number; alpha: number; size: number }[] = [];
    const styles = getComputedStyle(canvas);
    const color = styles.getPropertyValue('--footer-particle-color').trim();
    const endColor = styles.getPropertyValue('--footer-particle-color-end').trim();
    const area = parseFloat(styles.getPropertyValue('--footer-particle-area'));
    const limit = parseFloat(styles.getPropertyValue('--footer-particle-limit'));
    let fieldColor: string | CanvasGradient = color;
    const fadeTravel = parseFloat(styles.getPropertyValue('--footer-particle-fade-travel'));
    const speed = parseFloat(styles.getPropertyValue('--footer-particle-speed'));

    const draw = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || reducedMotion.matches) return;
      if (lastTime) travel += Math.min(time - lastTime, 50) / 1000;
      lastTime = time;
      context.clearRect(0, 0, width, height);
      context.fillStyle = fieldColor;
      for (const pixel of pixels) {
        const y = ((pixel.y - travel * pixel.speed) % height + height) % height;
        // Fade through the lower 70% of the name container, not the footer.
        const remaining = Math.min(1, Math.max(0, (y - fadeEnd) / Math.max(1, fadeStart - fadeEnd)));
        const opacity = remaining * remaining * (3 - 2 * remaining);
        if (opacity === 0) continue;
        context.globalAlpha = pixel.alpha * opacity;
        context.fillRect(pixel.x, y, pixel.size, pixel.size);
      }
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(draw);
      else context.clearRect(0, 0, width, height);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const nameRect = nameContainer.getBoundingClientRect();
      fadeStart = nameRect.bottom - rect.top;
      fadeEnd = fadeStart - nameRect.height * fadeTravel;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Stable distribution prevents a new random pattern on every activation.
      let seed = 71;
      const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, endColor);
      fieldColor = gradient;
      const cell = Math.max(Math.sqrt(area), Math.sqrt(width * height / limit));
      const columns = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      pixels = Array.from({ length: columns * rows }, (_, index) => ({
        x: ((index % columns) + .15 + random() * .7) * width / columns,
        y: (Math.floor(index / columns) + random()) * height / rows,
        speed: speed * (.45 + random()),
        alpha: .25 + random() * .55,
        size: 1.5 + random() * 1.5,
      }));
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resize();
    resizeObserver.observe(canvas);
    resizeObserver.observe(nameContainer);
    intersectionObserver.observe(canvas);
    reducedMotion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      context.clearRect(0, 0, width, height);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="signature-pixels" aria-hidden="true" />;
}

export default function Footer() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [toggled, setToggled] = useState(false);
  const active = hovered || focused || toggled;

  return (
    <footer className={`signature-footer${active ? ' is-active' : ''}`}>
      <RisingPixels active={active} />
      <button
        type="button"
        className="signature-name"
        aria-label="Vicki — toggle footer animation"
        aria-pressed={toggled}
        onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocus={(event) => setFocused(event.currentTarget.matches(':focus-visible'))}
        onBlur={() => { setFocused(false); setToggled(false); }}
        onClick={() => setToggled((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') { setToggled(false); event.currentTarget.blur(); }
        }}
      >
        <span className="signature-text" aria-hidden="true">
          <DancingLetters
            text="Vicki"
            appearance="inherit"
            animateOnActivate={active}
            className="signature-letters"
            letterClassName="signature-letter"
          />
        </span>
      </button>
      <div className="signature-legal">
        <p>©{new Date().getFullYear()} All rights reserved. Vicki.</p>
        <p>Any reproduction, distribution, or use of the materials without permission is prohibited.</p>
      </div>
    </footer>
  );
}
