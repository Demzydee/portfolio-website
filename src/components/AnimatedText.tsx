import { CSSProperties, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split into words and whitespace so we can keep characters grouped
  // inside words (prevent orphaned single letters at line breaks).
  const tokens = text.split(/(\s+)/);

  return (
    <p ref={ref} className={className} style={style}>
      {tokens.map((token, tokenIdx) => {
        if (/^\s+$/.test(token)) {
          // preserve whitespace between words
          return <span key={`sp-${tokenIdx}`}>{token}</span>;
        }

        // render each word as a non-breaking group of characters
        const chars = token.split('');
        return (
          <span key={`w-${tokenIdx}`} style={{ whiteSpace: 'nowrap' }}>
            {chars.map((char, i) => {
              const globalIndex = tokenIdx + i; // coarse progress mapping
              const start = globalIndex / Math.max(1, text.length);
              const end = start + 1 / Math.max(1, text.length);
              return (
                <Char
                  key={`${tokenIdx}-${i}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}
