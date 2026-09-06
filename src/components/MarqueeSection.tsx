import { useEffect, useRef } from 'react';

const videoSources = [
  '/videos/global_gateway_communication.mp4',
  '/videos/nietzsche_sustainibilty.mp4',
];

function buildTiles(count: number) {
  const repeated = [...Array(count)].map((_, index) => ({
    id: `work-${index}`,
    src: videoSources[index % videoSources.length],
    label: `Work ${index + 1}`,
  }));

  return [...repeated, ...repeated, ...repeated];
}

const row1Tiles = buildTiles(11);
const row2Tiles = buildTiles(10);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!section || !row1 || !row2) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      row1.style.transform = `translateX(${offset - 200}px)`;
      row2.style.transform = `translateX(${-(offset - 200)}px)`;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {row1Tiles.map((tile) => (
            <video
              key={`${tile.id}-${tile.label}`}
              src={tile.src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label={tile.label}
              className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {row2Tiles.map((tile) => (
            <video
              key={`${tile.id}-${tile.label}`}
              src={tile.src}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label={tile.label}
              className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
