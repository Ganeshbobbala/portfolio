import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const lines = [
  { text: "initializing portfolio...", start: 0, duration: 700 },
  { text: "loading profile...", start: 900, duration: 700 },
  { text: "loading skills...", start: 1800, duration: 700 },
  { text: "loading projects...", start: 2700, duration: 700 },
  { text: "✓ portfolio ready", start: 3600, duration: 700 }
];

const TerminalIntro = ({ onComplete }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let startTime = performance.now();
    let animationFrameId;

    const update = () => {
      const now = performance.now();
      const delta = now - startTime;
      setElapsed(delta);

      // Auto-complete at 4800ms
      if (delta < 4800) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setElapsed(4800);
        const timer = setTimeout(onComplete, 50);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Global skip listener (any key or click anywhere)
  useEffect(() => {
    const handleSkip = (e) => {
      // Prevent skipping if clicking the skip button to avoid double triggering
      if (e.target.closest('.skip-btn')) return;
      onComplete();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [onComplete]);

  // Calculate active cursor index
  let activeCursorIndex = 0;
  if (elapsed >= 3600) {
    activeCursorIndex = 4;
  } else {
    for (let i = 0; i < lines.length; i++) {
      const nextLineStart = i < lines.length - 1 ? lines[i + 1].start : Infinity;
      if (elapsed >= lines[i].start && elapsed < nextLineStart) {
        activeCursorIndex = i;
        break;
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -40,
        filter: 'blur(10px)',
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020202] select-none cursor-pointer"
    >
      {/* Premium subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Terminal Container */}
      <div className="max-w-md w-full px-8 font-mono text-sm leading-relaxed text-zinc-300">
        <div className="flex flex-col gap-3.5">
          {lines.map((line, idx) => {
            if (elapsed < line.start) return null;

            // Calculate displayed characters for this line
            const isFinished = elapsed >= line.start + line.duration;
            let displayText = line.text;
            if (!isFinished) {
              const progress = (elapsed - line.start) / line.duration;
              const charCount = Math.floor(progress * line.text.length);
              displayText = line.text.slice(0, charCount);
            }

            const showCursor = activeCursorIndex === idx;
            const isLastLine = idx === 4;

            return (
              <div key={idx} className="flex items-center min-h-[24px]">
                {/* Prompt prefix character ">" */}
                <span className="text-blue-500/70 mr-2.5 font-bold select-none">&gt;</span>

                {/* Content */}
                <span className="tracking-wide">
                  {isLastLine ? (
                    <>
                      {displayText.startsWith("✓") ? (
                        <>
                          <span className="text-emerald-400 font-bold mr-1.5">✓</span>
                          <span className="text-zinc-100 font-medium">{displayText.slice(2)}</span>
                        </>
                      ) : (
                        <span className="text-zinc-100 font-medium">{displayText}</span>
                      )}
                    </>
                  ) : (
                    displayText
                  )}
                </span>

                {/* Blinking Cursor */}
                {showCursor && (
                  <span className="inline-block w-1.5 h-3.5 ml-1.5 bg-blue-500/90 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-[blink_0.8s_infinite] align-middle" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Styling for blinking cursor */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Bottom Hint */}
      <div className="absolute bottom-10 text-[10px] tracking-[0.2em] uppercase text-zinc-600 pointer-events-none font-sans">
        Click or press any key to skip
      </div>

      {/* Explicit Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="skip-btn absolute bottom-8 right-8 px-4 py-1.5 border border-white/5 hover:border-white/15 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase bg-zinc-950/40 text-zinc-500 hover:text-zinc-300 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 z-20"
      >
        Skip Intro
      </button>
    </motion.div>
  );
};

export default TerminalIntro;
