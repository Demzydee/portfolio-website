import { useEffect, useRef } from 'react';

// Type definitions for extended navigator with connection info
interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: '2g' | 'slow-2g' | '3g' | '4g';
}

interface ExtendedNavigator extends Navigator {
  connection?: NetworkInformation;
}

// Type definitions for model-viewer element
interface ModelViewerElement extends HTMLElement {
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  addEventListener(
    type: string,
    listener: EventListener | EventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener | EventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

export default function ModelViewer() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Lazy-init and responsive model handling
    let raf = 0;
    let targetYaw = 0;
    let currentYaw = 0;
    let targetPhi = 0;
    let currentPhi = 0;
    let pointerYawOffset = 0;
    let pointerPitchOffset = 0;
    let scrollPitchOffset = 0;
    let inactivityTimer: number | null = null;
    let initCleanup: (() => void) | null = null;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function chooseModelSrc() {
      try {
        const nav = navigator as ExtendedNavigator;
        const connection = nav.connection;
        const saveData = connection?.saveData ?? false;
        const effectiveType = connection?.effectiveType ?? '4g';
        const w = window.innerWidth || document.documentElement.clientWidth;
        if (saveData || effectiveType === '2g' || effectiveType === 'slow-2g') return '/models/realistic-head-opt.glb';
        if (w <= 420) return '/models/realistic-head-opt.glb';
        if (w <= 1024) return '/models/realistic-head-mid.glb';
        return '/models/realistic-head-mid.glb';
      } catch (err) {
        console.error('Error choosing model source:', err);
        return '/models/realistic-head-mid.glb';
      }
    }

    function createModelElement() {
      // avoid creating a second model if one already exists
      if (ref.current && ref.current.querySelector && ref.current.querySelector('model-viewer')) return;
      const m = document.createElement('model-viewer') as ModelViewerElement;
      m.setAttribute('src', chooseModelSrc());
      m.setAttribute('alt', 'Vicki realistic head portrait');
      m.setAttribute('loading', 'lazy');
      m.setAttribute('reveal', 'auto');
      m.setAttribute('shadow-intensity', '0.0');
      m.style.background = 'transparent';
      m.style.width = 'min(46vw, 640px)';
      m.style.height = 'min(46vw, 640px)';
      m.style.maxWidth = '100%';
      m.style.maxHeight = '100%';
      m.style.display = 'block';
      m.style.margin = '0';
      m.style.padding = '0';
      m.style.border = 'none';
      m.style.outline = 'none';
      m.style.borderRadius = '0';
      m.style.boxSizing = 'content-box';
      m.style.boxShadow = 'none';
      m.style.filter = 'none';
      m.style.overflow = 'visible';
      m.style.pointerEvents = 'auto';
      m.style.cursor = 'default';

      const stopClick = (ev: Event) => {
        ev.stopPropagation();
        ev.preventDefault();
      };
      m.addEventListener('pointerdown', stopClick);
      m.addEventListener('click', stopClick);

      m.removeAttribute('auto-rotate');

      const DEFAULT_YAW = -14;
      const DEFAULT_PHI = 75;
      const INACTIVITY_MS = 5000;
      let MAX_SWIVEL = 45;
      let MAX_TILT = 45;

      if (window.innerWidth <= 420) {
        MAX_SWIVEL = 30;
        MAX_TILT = 25;
      } else if (window.innerWidth <= 768) {
        MAX_SWIVEL = 35;
        MAX_TILT = 30;
      }

      function syncTargetOrientation() {
        targetYaw = DEFAULT_YAW + pointerYawOffset;
        targetPhi = DEFAULT_PHI + scrollPitchOffset + pointerPitchOffset;
        if (targetPhi < 10) targetPhi = 10;
        if (targetPhi > 170) targetPhi = 170;
      }

      function resetInactivity() {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        inactivityTimer = window.setTimeout(() => {
          pointerYawOffset = 0;
          pointerPitchOffset = 0;
          syncTargetOrientation();
        }, INACTIVITY_MS);
      }

      function onDoubleClick() {
        pointerYawOffset = 0;
        pointerPitchOffset = 0;
        syncTargetOrientation();
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
          inactivityTimer = null;
        }
      }

      function onPointerMove(e: PointerEvent) {
        const hero = ref.current ? (ref.current.closest('section') as HTMLElement | null) : null;
        const rect = hero ? hero.getBoundingClientRect() : (ref.current as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width || window.innerWidth || document.documentElement.clientWidth;
        const h = rect.height || window.innerHeight || document.documentElement.clientHeight;
        const nx = (x / w - 0.5) * 2;
        const ny = (y / h - 0.5) * 2;
        pointerYawOffset = -nx * MAX_SWIVEL;
        pointerPitchOffset = -ny * MAX_TILT;
        syncTargetOrientation();
        // touch smoothing
        if ((e as any).pointerType === 'touch') {
          currentYaw += (targetYaw - currentYaw) * 0.08;
          currentPhi += (targetPhi - currentPhi) * 0.08;
        }
        resetInactivity();
      }

      function animate() {
        if (prefersReduced) {
          try {
            m.setAttribute('camera-orbit', `${DEFAULT_YAW}deg ${DEFAULT_PHI}deg 2.2m`);
          } catch (err) {
            console.error('Failed to set reduced motion camera orbit:', err);
          }
          return;
        }
        const returningToDefault = Math.abs(targetYaw - DEFAULT_YAW) < 0.001 && Math.abs(targetPhi - DEFAULT_PHI) < 0.001;
        const speed = returningToDefault ? 0.06 : 0.12;
        currentYaw += (targetYaw - currentYaw) * speed;
        currentPhi += (targetPhi - currentPhi) * speed;
        const radius = 2.2;
        try {
          m.setAttribute('camera-orbit', `${currentYaw.toFixed(2)}deg ${currentPhi.toFixed(2)}deg ${radius}m`);
        } catch (err) {
          console.error('Failed to update model camera orbit:', err);
        }
        raf = requestAnimationFrame(animate);
      }

      if (ref.current) ref.current.appendChild(m);

      function setInitialOrbit() {
        try {
          m.setAttribute('camera-orbit', `${DEFAULT_YAW}deg ${DEFAULT_PHI}deg 2.2m`);
        } catch (err) {
          console.error('Failed to set initial orbit:', err);
        }
        currentYaw = DEFAULT_YAW;
        targetYaw = DEFAULT_YAW;
        currentPhi = DEFAULT_PHI;
        targetPhi = DEFAULT_PHI;
      }

      m.addEventListener('load', setInitialOrbit, { once: true } as AddEventListenerOptions);

      const container = ref.current as HTMLElement | null;
      const hero = container ? (container.closest('section') as HTMLElement | null) : null;
      const actualListenTarget = (hero || container || window) as unknown as HTMLElement;

      actualListenTarget.addEventListener('pointermove', onPointerMove as EventListener);
      actualListenTarget.addEventListener('pointerleave', () => {
        pointerYawOffset = 0;
        pointerPitchOffset = 0;
        syncTargetOrientation();
        resetInactivity();
      });
      actualListenTarget.addEventListener('dblclick', onDoubleClick as EventListener);

      setInitialOrbit();

      raf = requestAnimationFrame(animate);

      // auto-look-down: tie pitch to scroll progress past the hero
      let removeScroll: (() => void) | null = null;
      try {
        const heroEl = ref.current ? (ref.current.closest('section') as HTMLElement | null) : null;
        const LOOK_DOWN_OFFSET = window.innerWidth <= 420 ? 20 : 12; // degrees to add when fully scrolled
        if (heroEl) {
          let ticking = false;
          function handleScroll() {
            if (prefersReduced) return;
            if (!ticking) {
              window.requestAnimationFrame(() => {
                if (!heroEl) return;

                const heroRect = heroEl.getBoundingClientRect();
                const heroTop = heroEl.offsetTop || 0;
                const heroHeight = heroEl.offsetHeight || window.innerHeight;
                const scrollProgress = Math.min(
                  1,
                  Math.max(0, (window.scrollY - heroTop) / (heroHeight * 0.8))
                );
                const viewportProgress = Math.min(
                  1,
                  Math.max(0, (window.innerHeight - heroRect.top) / (window.innerHeight * 0.9))
                );
                const progress = Math.min(scrollProgress, viewportProgress);
                scrollPitchOffset = progress * LOOK_DOWN_OFFSET;
                syncTargetOrientation();
                resetInactivity();
                ticking = false;
              });
              ticking = true;
            }
          }
          window.addEventListener('scroll', handleScroll, { passive: true });
          // initialize
          handleScroll();
          removeScroll = () => window.removeEventListener('scroll', handleScroll);
        }
      } catch (err) {
        console.error('Error setting up scroll animation:', err);
      }

      initCleanup = () => {
        // Remove event listeners from actual target they were added to
        actualListenTarget.removeEventListener('pointermove', onPointerMove as EventListener);
        actualListenTarget.removeEventListener('pointerleave', () => {});
        actualListenTarget.removeEventListener('dblclick', onDoubleClick as EventListener);
        m.removeEventListener('pointerdown', stopClick as EventListener);
        m.removeEventListener('click', stopClick as EventListener);
        cancelAnimationFrame(raf);
        if (ref.current && m.parentElement === ref.current) ref.current.removeChild(m);
        if (removeScroll) {
          try { removeScroll(); } catch (err) {
            console.error('Error removing scroll listener:', err);
          }
          removeScroll = null;
        }
      };
    }

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            createModelElement();
            if (observer) {
              observer.disconnect();
              observer = null;
            }
            break;
          }
        }
      }, { root: null, rootMargin: '300px', threshold: 0.01 });
      if (ref.current) observer.observe(ref.current);
    } else {
      createModelElement();
    }

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (initCleanup) initCleanup();
    };
  }, []);

  return <div ref={ref} />;
}
