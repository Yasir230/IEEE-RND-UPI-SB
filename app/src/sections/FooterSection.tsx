import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const divisions = ['RND', 'Community', 'Content', 'External Relations'];
const resources = ['Google Drive', 'GitHub', 'Documentation'];
const socials = [
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Email', href: 'mailto:ieee@upi.edu' },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = sectionRef.current?.querySelectorAll('.footer-col');
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      style={{
        background: '#023E8A',
        padding: '80px clamp(20px, 4vw, 64px) 40px',
      }}
    >
      {/* Watermark */}
      <div
        className="overflow-hidden select-none pointer-events-none"
        style={{ marginBottom: 48 }}
      >
        <p
          className="font-heading-hero text-center whitespace-nowrap"
          style={{
            color: 'rgba(255,255,255,0.06)',
            fontSize: 'clamp(48px, 10vw, 120px)',
          }}
        >
          RND MEMORIES
        </p>
      </div>

      {/* Three Column Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Column 1 */}
        <div className="footer-col">
          <h3 className="font-label mb-4" style={{ color: '#FFFFFF' }}>
            IEEE UPI SB
          </h3>
          <p className="font-body-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            Universitas Pendidikan Indonesia —  IEEE UPI Student Branch.
            Engineering Brings Development.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4
                className="font-label mb-4"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              >
                DIVISIONS
              </h4>
              <ul className="space-y-2">
                {divisions.map((d) => (
                  <li key={d}>
                    <span
                      className="font-body-sm inline-block transition-all duration-300 hover:text-[#48CAE4] hover:translate-x-1 cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="font-label mb-4"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              >
                RESOURCES
              </h4>
              <ul className="space-y-2">
                {resources.map((r) => (
                  <li key={r}>
                    <span
                      className="font-body-sm inline-block transition-all duration-300 hover:text-[#48CAE4] hover:translate-x-1 cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4
            className="font-label mb-4"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}
          >
            CONNECT
          </h4>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  className="font-body-sm inline-flex items-center gap-2 transition-all duration-300 hover:text-[#48CAE4] hover:translate-x-1"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {s.name}
                  {s.href.startsWith('http') && (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 4h6v6M12 4L5 11" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div
        className="max-w-6xl mx-auto"
        style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 24 }}
      />

      {/* Copyright */}
      <p
        className="font-label text-center"
        style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}
      >
        © 2025 IEEE UPI Student Branch. All rights reserved.
      </p>
    </footer>
  );
}
