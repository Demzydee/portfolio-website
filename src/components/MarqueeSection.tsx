import { useEffect, useState } from 'react';

const videoSources = [
  '/videos/work1.mp4',
  '/videos/work2.mp4',
  '/videos/work3.mp4',
];

function buildTiles(count: number) {
  const tiles = Array.from({ length: count }, (_, index) => ({
    id: `work-${index}`,
    src: videoSources[index % videoSources.length],
    label: `Work ${index + 1}`,
  }));

  return [...tiles, ...tiles];
}

const row1Tiles = buildTiles(12);
const row2Tiles = buildTiles(12);

export default function MarqueeSection() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setScrollOffset(window.scrollY);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3 marquee-shell">
        <div
          className="marquee-track marquee-track-left"
          style={{ transform: `translate3d(${-scrollOffset * 0.28}px, 0, 0)` }}
        >
          {row1Tiles.map((tile, index) => (
            <video
              key={`${tile.id}-${index}`}
              src={tile.src}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={tile.label}
              className="marquee-video"
              onError={(event) => {
                const video = event.currentTarget;
                video.style.display = 'none';
              }}
            />
          ))}
        </div>
        <div
          className="marquee-track marquee-track-right"
          style={{ transform: `translate3d(${scrollOffset * 0.22}px, 0, 0)` }}
        >
          {row2Tiles.map((tile, index) => (
            <video
              key={`${tile.id}-row2-${index}`}
              src={tile.src}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={tile.label}
              className="marquee-video"
              onError={(event) => {
                const video = event.currentTarget;
                video.style.display = 'none';
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
