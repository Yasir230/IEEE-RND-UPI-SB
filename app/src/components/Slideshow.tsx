import { useCallback, useEffect, useRef, useState } from 'react';
import { humanizerID } from '../lib/humanizer-id';

interface Slide {
  src: string;
  title: string;
  caption: string;
}

const SLIDES: Slide[] = [
  { src: '/images/photo-workshop-1.jpg', title: 'Workshop 2023', caption: 'Bikin project bareng di workshop tahun ini' },
  { src: '/images/photo-meeting-1.jpg', title: 'RND Meetup', caption: 'Ngumpul bareng tim RND, rame banget' },
  { src: '/images/photo-team-1.jpg', title: 'Division Photo', caption: 'Foto bareng tim, kompak abis' },
  { src: '/images/photo-coding-1.jpg', title: 'Late Night Session', caption: 'Ngoding sampe malem, seru tapi ngantuk' },
  { src: '/images/photo-bonding-1.jpg', title: 'Team Bonding', caption: 'Momen bonding bareng tim RND' },
  { src: '/images/photo-casual-1.jpg', title: 'Campus Hangout', caption: 'Hanging out di kampus, santai' },
  { src: '/images/photo-event-1.jpg', title: 'Tech Talk 2023', caption: 'Tech Talk seru tentang teknologi terbaru' },
  { src: '/images/photo-graduation-1.jpg', title: 'Graduation Day', caption: 'Hari wisuda, bangga banget' },
  { src: '/images/photo-present-1.jpg', title: 'Project Presentation', caption: 'Nge-present hasil kerjaan kita' },
  { src: '/images/photo-lab-1.jpg', title: 'Lab Research', caption: 'Riset di lab, eksplorasi ilmu baru' },
  { src: '/images/photo-candid-1.jpg', title: 'Between Classes', caption: 'Di sela kuliah, tetap produktif' },
];

const TRANSITIONS = [
  'kenburns',
  'crossfade-blur',
  'curtain-wipe',
  'flash-cut',
] as const;

type Transition = (typeof TRANSITIONS)[number];

function getTransitionClass(transition: Transition, state: 'enter' | 'exit') {
  switch (transition) {
    case 'kenburns':
      return state === 'enter' ? 'slide-enter-kenburns' : 'slide-exit-kenburns';
    case 'crossfade-blur':
      return state === 'enter' ? 'slide-enter-blur' : 'slide-exit-blur';
    case 'curtain-wipe':
      return state === 'enter' ? 'slide-enter-curtain' : 'slide-exit-curtain';
    case 'flash-cut':
      return state === 'enter' ? 'slide-enter-flash' : 'slide-exit-flash';
    default:
      return '';
  }
}

interface SlideshowProps {
  open: boolean;
  onClose: () => void;
  onRequestMusic: () => void;
}

export default function Slideshow({ open, onClose, onRequestMusic }: SlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState<Transition>('kenburns');
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [paused, setPaused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const overlayTimerRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const duration = 5000;

  // Start / reset timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setPhase('exit');
    const nextIndex = (current + 1) % SLIDES.length;
    const nextTransition = TRANSITIONS[nextIndex % TRANSITIONS.length];

    timerRef.current = window.setTimeout(() => {
      setCurrent(nextIndex);
      setTransition(nextTransition);
      setPhase('enter');
    }, 600);
  }, [current]);

  // Auto-advance loop
  useEffect(() => {
    if (!open || paused) {
      clearTimer();
      return;
    }

    timerRef.current = window.setTimeout(() => {
      advance();
    }, duration);

    return () => clearTimer();
  }, [open, paused, advance, clearTimer, current, transition]);

  // Progress bar animation via rAF
  useEffect(() => {
    if (!open || paused) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = () => {
      if (!progressRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = performance.now() - startTimeRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      progressRef.current.style.width = `${pct}%`;
      if (pct < 100 && !isPausedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [open, paused, current, transition]);

  // Keyboard / fullscreen / overlay auto-hide
  useEffect(() => {
    if (!open) return;

    // Request fullscreen
    const el = containerRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }

    // Start music
    onRequestMusic();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      }
      if (e.key === 'ArrowRight') {
        clearTimer();
        setPhase('exit');
        window.setTimeout(() => {
          setCurrent((c) => (c + 1) % SLIDES.length);
          setPhase('enter');
        }, 400);
      }
      if (e.key === 'ArrowLeft') {
        clearTimer();
        setPhase('exit');
        window.setTimeout(() => {
          setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
          setPhase('enter');
        }, 400);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [open, onClose, onRequestMusic, clearTimer]);

  // Overlay auto-hide after 2s inactivity
  const bumpOverlay = useCallback(() => {
    setShowOverlay(true);
    if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = window.setTimeout(() => {
      setShowOverlay(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!open) return;
    bumpOverlay();
    return () => {
      if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    };
  }, [open, bumpOverlay]);

  const togglePause = () => {
    setPaused((p) => {
      const next = !p;
      isPausedRef.current = next;
      if (next) {
        pausedAtRef.current = performance.now();
      } else {
        // Adjust startTime so progress continues from where it left off
        const pausedDuration = performance.now() - pausedAtRef.current;
        startTimeRef.current += pausedDuration;
      }
      return next;
    });
    bumpOverlay();
  };

  const closeSlideshow = () => {
    clearTimer();
    onClose();
  };

  if (!open) return null;

  const slide = SLIDES[current];
  const humanTitle = humanizerID(slide.title);
  const humanCaption = humanizerID(slide.caption);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[150] bg-black select-none"
      onClick={bumpOverlay}
      onMouseMove={bumpOverlay}
      onTouchStart={bumpOverlay}
    >
      {/* Background layers for crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          key={slide.src + '-' + current}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${
            phase === 'enter' ? getTransitionClass(transition, 'enter') : getTransitionClass(transition, 'exit')
          }`}
          style={{ backgroundImage: `url(${slide.src})` }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6">
        <div className="text-center max-w-3xl">
          <h2
            className="font-heading-section text-white mb-3"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {humanTitle.split(' ').map((word, i) => (
              <span
                key={i}
                className="inline-block mr-2"
                style={{
                  animation: phase === 'enter' ? `wordIn 0.5s ease forwards` : `wordOut 0.3s ease forwards`,
                  animationDelay: phase === 'enter' ? `${i * 0.08}s` : '0s',
                  opacity: phase === 'enter' ? 0 : 1,
                }}
              >
                {word}
              </span>
            ))}
          </h2>
          <p
            className="font-body text-white/80"
            style={{
              textShadow: '0 1px 10px rgba(0,0,0,0.5)',
              animation: phase === 'enter' ? 'captionUp 0.7s ease forwards' : 'captionDown 0.4s ease forwards',
              animationDelay: phase === 'enter' ? '0.3s' : '0s',
              opacity: phase === 'enter' ? 0 : 1,
            }}
          >
            {humanCaption}
          </p>
        </div>
      </div>

      {/* Top controls overlay (auto-hide) */}
      <div
        className={`absolute top-0 left-0 right-0 p-5 flex items-center justify-between transition-opacity duration-500 ${
          showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}
      >
        <div className="font-label text-white/70" style={{ fontSize: 12 }}>
          {current + 1} / {SLIDES.length}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); togglePause(); }}
            className="font-label text-white/80 hover:text-white transition-colors px-3 py-1 rounded"
            style={{ fontSize: 11, border: '1px solid rgba(255,255,255,0.2)' }}
          >
            {paused ? '▶ Lanjut' : '⏸ Jeda'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeSlideshow(); }}
            className="font-label text-white/80 hover:text-white transition-colors px-3 py-1 rounded"
            style={{ fontSize: 11, border: '1px solid rgba(255,255,255,0.2)' }}
          >
            ✕ Keluar
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"
      >
        <div
          ref={progressRef}
          className="h-full"
          style={{ width: '0%', background: 'rgba(72, 202, 228, 0.9)' }}
        />
      </div>

      {/* Flash overlay for flash-cut transition */}
      <div
        className="absolute inset-0 pointer-events-none bg-white"
        style={{
          opacity: phase === 'exit' && transition === 'flash-cut' ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      />

      <style>{`
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes captionUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes captionDown {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(10px); }
        }

        .slide-enter-kenburns {
          animation: kenburnsIn 6s ease forwards;
        }
        .slide-exit-kenburns {
          animation: kenburnsOut 0.6s ease forwards;
        }
        @keyframes kenburnsIn {
          from { transform: scale(1.15) translate(2%, -1%); opacity: 0; }
          to   { transform: scale(1.05) translate(0, 0); opacity: 1; }
        }
        @keyframes kenburnsOut {
          from { transform: scale(1.05) translate(0, 0); opacity: 1; }
          to   { transform: scale(1.15) translate(-2%, 1%); opacity: 0; }
        }

        .slide-enter-blur {
          animation: blurIn 0.8s ease forwards;
        }
        .slide-exit-blur {
          animation: blurOut 0.6s ease forwards;
        }
        @keyframes blurIn {
          from { filter: blur(12px); opacity: 0; }
          to   { filter: blur(0px); opacity: 1; }
        }
        @keyframes blurOut {
          from { filter: blur(0px); opacity: 1; }
          to   { filter: blur(12px); opacity: 0; }
        }

        .slide-enter-curtain {
          animation: curtainIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .slide-exit-curtain {
          animation: curtainOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes curtainIn {
          from { clip-path: inset(0 100% 0 0); opacity: 0; }
          to   { clip-path: inset(0 0% 0 0); opacity: 1; }
        }
        @keyframes curtainOut {
          from { clip-path: inset(0 0% 0 0); opacity: 1; }
          to   { clip-path: inset(0 0 0 100%); opacity: 0; }
        }

        .slide-enter-flash {
          animation: flashIn 0.5s ease forwards;
        }
        .slide-exit-flash {
          animation: flashOut 0.3s ease forwards;
        }
        @keyframes flashIn {
          from { opacity: 0; filter: brightness(2); }
          to   { opacity: 1; filter: brightness(1); }
        }
        @keyframes flashOut {
          from { opacity: 1; filter: brightness(1); }
          to   { opacity: 0; filter: brightness(1.5); }
        }

        @media (prefers-reduced-motion: reduce) {
          .slide-enter-kenburns, .slide-exit-kenburns,
          .slide-enter-blur, .slide-exit-blur,
          .slide-enter-curtain, .slide-exit-curtain,
          .slide-enter-flash, .slide-exit-flash {
            animation: none !important;
            opacity: 1 !important;
            filter: none !important;
            clip-path: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
