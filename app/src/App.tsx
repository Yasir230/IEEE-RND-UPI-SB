import { useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import PhotoGallerySection from './sections/PhotoGallerySection';
import FeaturedMemorySection from './sections/FeaturedMemorySection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative">
      <Navigation onScrollTo={scrollTo} />
      <main>
        <HeroSection />
        <IntroSection />
        <PhotoGallerySection />
        <FeaturedMemorySection />
        <FooterSection />
      </main>
      <AudioPlayer />
    </div>
  );
}

export default App;
