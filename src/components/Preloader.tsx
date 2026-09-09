import { useEffect, useState, useCallback } from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';

interface PreloaderProps {
  onReady: () => void;
}

const PRELOAD_ASSET_PATHS = ['/videos/work1.mp4', '/videos/work2.mp4', '/videos/work3.mp4'];

function getMediaType(url: string) {
  return /\.(mp4|webm|mov|ogg|m4v)$/i.test(url) ? 'video' : 'image';
}

function preloadSingleAsset(src: string) {
  return new Promise<void>((resolve) => {
    const mediaType = getMediaType(src);
    const handleSuccess = () => resolve();
    const handleError = (error?: Error) => {
      console.error(`Failed to preload asset: ${src}`, error);
      resolve(); // Still resolve to continue preloading other assets
    };

    if (mediaType === 'video') {
      const asset = document.createElement('video') as HTMLVideoElement;
      asset.preload = 'auto';
      asset.muted = true;
      asset.playsInline = true;
      asset.onloadeddata = handleSuccess;
      asset.oncanplaythrough = handleSuccess;
      asset.onerror = () => handleError(new Error('Video load error'));
      asset.src = src;
      return;
    }

    const asset = new Image();
    asset.onload = handleSuccess;
    asset.onerror = () => handleError(new Error('Image load error'));
    asset.src = src;
  });
}

const letters = ['V', 'i', 'c', 'k', 'i'];

export default function Preloader({ onReady: onReadyProp }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Wrap onReady in useCallback to make it stable
  const onReady = useCallback(onReadyProp, [onReadyProp]);

  useEffect(() => {
    let cancelled = false;

    const preloadAll = async () => {
      const mediaNodes = Array.from(document.querySelectorAll('img, video, source'));
      const discoveredUrls = mediaNodes
        .map((node) => {
          const element = node as Element;
          if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLSourceElement) {
            return element.src;
          }
          return null;
        })
        .filter((value): value is string => Boolean(value));

      const assetUrls = Array.from(new Set([...PRELOAD_ASSET_PATHS, ...discoveredUrls]));
      const total = assetUrls.length || 1;

      for (let index = 0; index < assetUrls.length; index += 1) {
        if (cancelled) return;
        await preloadSingleAsset(assetUrls[index]);
        if (!cancelled) {
          setProgress(Math.min(100, Math.round(((index + 1) / total) * 100)));
        }
      }

      if (!cancelled) {
        if (document.fonts && 'ready' in document.fonts) {
          await document.fonts.ready;
        }

        await new Promise<void>((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
            return;
          }
          window.addEventListener('load', () => resolve(), { once: true });
        });
      }

      if (!cancelled) {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          onReady();
        }, 450);
      }
    };

    preloadAll();

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  return (
    <div
      className={`preloader-shell ${isVisible ? 'preloader-visible' : 'preloader-hidden'}`}
      aria-live="polite"
      aria-busy={isVisible}
    >
      <div className="preloader-content">
        <LazyMotion features={domAnimation}>
          <m.div
            className="preloader-word"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.09 },
              },
            }}
          >
            {letters.map((letter, index) => (
              <m.span
                key={`${letter}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      ease: [0.65, 0, 0.35, 1],
                    },
                  },
                }}
                className="preloader-letter"
                animate={
                  index % 2 === 0
                    ? {
                        scaleX: [1, 1.18, 0.92, 1.08, 1],
                        scaleY: [1, 0.82, 1.22, 0.96, 1],
                        rotate: [0, 12, -8, 6, 0],
                        y: [0, -10, 6, -3, 0],
                      }
                    : {
                        scaleX: [1, 0.88, 1.14, 1],
                        scaleY: [1, 1.2, 0.88, 1],
                        rotate: [0, -10, 7, 0],
                        y: [0, 8, -6, 0],
                      }
                }
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: index * 0.08,
                }}
              >
                {letter}
              </m.span>
            ))}
          </m.div>
        </LazyMotion>

        <div className="preloader-progress-wrap" aria-label="Loading progress">
          <span className="preloader-progress-value">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
