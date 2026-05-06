# Tech Spec — RND IEEE UPI SB Memories

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3 | UI framework |
| `react-dom` | ^18.3 | DOM renderer |
| `vite` | ^6.0 | Build tool |
| `@vitejs/plugin-react` | ^4.3 | Vite React support |
| `typescript` | ^5.6 | Type safety |
| `tailwindcss` | ^4.0 | Utility CSS |
| `@tailwindcss/vite` | ^4.0 | Tailwind Vite integration |
| `gsap` | ^3.12 | Animation engine (ScrollTrigger, timeline) |
| `lenis` | ^1.1 | Smooth scroll with inertia |

**Fonts** (loaded via Google Fonts link in `index.html`):
- Instrument Serif (400)
- Inter (400, 500)
- IBM Plex Mono (400)

**No shadcn/ui** — this is a fully custom nostalgic/aesthetic design with no standard UI patterns. All components are custom-built.

---

## Component Inventory

### Layout

| Component | Source | Notes |
|---|---|---|
| `Navigation` | Custom | Fixed nav, transparent → solid transition based on scroll position. Scrollspy for active section. |
| `AudioPlayer` | Custom | Fixed bottom cassette-deck player. Complex: Web Audio API VU meters, scrubbing, volume, play/pause states. |

### Sections

| Component | Source | Notes |
|---|---|---|
| `HeroSection` | Custom | WebGL water canvas background + 3D memory card cluster + text overlay. |
| `IntroSection` | Custom | Centered text block with stats row. Simple entrance animation. |
| `PhotoGallerySection` | Custom | Masonry polaroid grid with stagger reveal. |
| `FeaturedMemorySection` | Custom | Two-column dark section: large polaroid + quote text. |
| `FooterSection` | Custom | Three-column footer with watermark text. |

### Reusable Components

| Component | Source | Used By |
|---|---|---|
| `PolaroidCard` | Custom | HeroSection, PhotoGallerySection, FeaturedMemorySection. Props: image, caption, rotation, size variant. |
| `WaterCanvas` | Custom (OGL) | HeroSection. Full WebGL water shader. Standalone, no React state. |
| `MemoryCardCluster` | Custom | HeroSection. GSAP-driven 3D card entrance + idle + hover. |

### Hooks

| Hook | Purpose |
|---|---|
| `useAudioPlayer` | Manages audio element, play/pause, scrubbing, volume, autoplay error handling. |
| `useVU Meters` | Web Audio API: creates AudioContext, AnalyserNode, reads frequency data, drives meter scale. |
| `useLenis` | Initializes Lenis smooth scroll, integrates with GSAP ScrollTrigger. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|---|---|---|---|
| WebGL Water Simulation | OGL (raw WebGL) | Fragment shader with caustics, god-rays, mouse parallax. Triangle mesh, uniform updates in rAF. | **High** 🔒 |
| 3D Memory Card Entrance | GSAP Timeline | Multi-step timeline: set deep Z darkness → rise → unfold → scale → XY position → rotate + deblur. onComplete starts idle + hover. | **High** 🔒 |
| Card Idle Float | GSAP | Per-card infinite yoyo sine oscillation with unique phase offsets. | Low |
| Card Hover (3D) | GSAP Timeline | mouseenter: rotateX/Y→0, z→50, shadow intensify, image scale 1.05, caption slide-up. mouseleave: reverse. | Medium |
| Hero Text Entrance | GSAP Timeline | Staggered fade+translateY for label → title → subtitle → scroll indicator. | Low |
| Section Scroll Reveals | GSAP + ScrollTrigger | Batch pattern: opacity 0→1, translateY 20-40px→0. Trigger at top 80-85%. | Low |
| Gallery Polaroid Stagger | GSAP + ScrollTrigger | fromTo with stagger 0.06s, scale 0.9→1, rotation from ±5°→final angle. | Medium |
| Featured Section Entrance | GSAP + ScrollTrigger | Polaroid slides from left with rotation. Text staggers from right. | Medium |
| Nav Background Transition | GSAP ScrollTrigger | ScrollTrigger at hero bottom toggles nav class. CSS transitions for bg/blur/color. | Low |
| Audio VU Meters | Web Audio API + rAF | AnalyserNode reads frequency data each frame. Scale transform on meter elements. 0.05s CSS transition for analog lag. | **High** 🔒 |
| Speaker Pulse Rings | GSAP | Two pseudo-elements, infinite scale+opacity animation with 0.8s offset. Only when playing. | Low |
| Scroll Indicator Loop | GSAP | Infinite translateY + opacity yoyo on the circle element. | Low |
| Polaroid Hover | CSS transition | rotate(0) translateY(-8px) scale(1.02), shadow-elevated. 0.4s cubic-bezier. | Low |

---

## State & Logic

### Audio Player State Machine

Three states: **idle** (before interaction), **playing**, **paused**.

- **Idle → Playing**: User clicks player. Call `audio.play()` inside click handler. Fade out overlay. Start VU meters + speaker pulse.
- **Playing → Paused**: User clicks pause. `audio.pause()`. Stop VU meters + speaker pulse.
- **Paused → Playing**: User clicks play. `audio.play()`. Resume VU meters + speaker pulse.
- **Autoplay attempt on mount**: `audio.play().catch(err => { if (err.name === 'NotAllowedError') stay in idle })`

### WebGL ↔ React Bridge

The water canvas is a raw WebGL context managed entirely outside React. Pattern:
- React component mounts the `<canvas>` ref
- `useEffect` initializes WebGL context, compiles shaders, starts rAF loop
- Cleanup: cancel rAF, delete WebGL resources
- No React state for uniforms — all updates happen in the rAF loop directly
- Resize handled via window resize listener, not React re-render

### Lenis + GSAP Integration

Lenis must be initialized once at app root and connected to GSAP's ticker:
- `lenis.on('scroll', ScrollTrigger.update)` — Lenis drives ScrollTrigger
- `gsap.ticker.add(time => lenis.raf(time * 1000))` — GSAP ticker drives Lenis
- `gsap.ticker.lagSmoothing(0)` — disable lag smoothing for smooth 1:1 sync

This integration means all scroll-triggered animations automatically use Lenis-smoothed scroll position.

---

## Other Key Decisions

**Raw WebGL over Three.js/R3F**: The water shader is a single fullscreen fragment shader with no 3D scene, no geometries, no materials. Three.js would add ~150KB for zero benefit. A ~40-line JS WebGL bootstrap is sufficient.

**OGL vs raw WebGL**: OGL is a minimal WebGL wrapper (~7KB) that simplifies buffer/geometry creation. Use it for the water canvas to reduce boilerplate while keeping bundle tiny. Alternative: pure raw WebGL if OGL adds friction.

**No React state for audio visualization**: The VU meter update loop runs at 60fps via `requestAnimationFrame` reading from `AnalyserNode.getByteFrequencyData()`. Writing this to React state would cause 60 re-renders/second. Instead, mutate DOM `style.transform` directly in the rAF loop.

**CSS Columns for masonry**: The polaroid gallery uses `columns: 3` (2 on tablet, 1 on mobile) with `break-inside: avoid`. This is the simplest masonry approach — no JS library needed. Random rotations assigned at render time via pre-generated array.

**Font loading strategy**: Google Fonts link in `<head>` with `display=swap`. Instrument Serif is the hero font — if it loads late, the entrance animation should be deferred or re-triggered. Use `document.fonts.ready` to gate the hero entrance animation.
