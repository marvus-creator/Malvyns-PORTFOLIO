import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Malvyn delivered our entire payment infrastructure ahead of schedule with zero defects in production. His architectural intuition and code quality are simply unmatched.",
    author: 'Sarah Chen',
    role: 'CTO',
    company: 'Nextlevel Studio',
    initials: 'SC',
    accent: '#B600A8',
  },
  {
    quote:
      "We've worked with dozens of engineers, but Malvyn stands apart. He sees three steps ahead, ships fast, and explains complex systems with absolute clarity.",
    author: 'Marcus Reid',
    role: 'Engineering Director',
    company: 'Aura Labs',
    initials: 'MR',
    accent: '#00b6a3',
  },
  {
    quote:
      "Malvyn rebuilt our entire frontend platform in six weeks and tripled our page-load performance. He's the kind of developer you build companies around.",
    author: 'Elena Volkov',
    role: 'Founder & CEO',
    company: 'Solaris Digital',
    initials: 'EV',
    accent: '#b65f00',
  },
  {
    quote:
      "The combination of design sensibility and deep engineering rigor is rare. Malvyn brought both, and our product is meaningfully better because of it.",
    author: 'David Park',
    role: 'Head of Product',
    company: 'Orbit Web3',
    initials: 'DP',
    accent: '#7621B0',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section
      className="relative w-full bg-[#0C0C0C] py-20 sm:py-28 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: current.accent }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section label */}
        <FadeIn delay={0} y={20}>
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-8 h-[1px] bg-fuchsia-500" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-bold font-mono">
              Client Testimonials
            </span>
            <div className="w-8 h-[1px] bg-fuchsia-500" />
          </div>
        </FadeIn>

        {/* Section heading */}
        <FadeIn delay={0.1} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            Kind Words
          </h2>
        </FadeIn>

        {/* Quote container */}
        <FadeIn delay={0.2} y={30}>
          <div className="relative min-h-[340px] sm:min-h-[280px] flex flex-col items-center justify-center">
            {/* Decorative quote icon */}
            <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-fuchsia-500/30" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto px-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="font-light text-[#D7E2EA] leading-relaxed"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)' }}
                >
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-sm shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${current.accent} 0%, ${current.accent}77 100%)`,
                      boxShadow: `0 0 20px ${current.accent}55`,
                    }}
                  >
                    {current.initials}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-[#D7E2EA] uppercase tracking-wider">
                      {current.author}
                    </span>
                    <span className="text-xs text-[#D7E2EA]/60 font-light">
                      {current.role} · {current.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Controls */}
        <FadeIn delay={0.3} y={20}>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${
                    i === index ? 'w-10 bg-fuchsia-500' : 'w-4 bg-[#D7E2EA]/20 hover:bg-[#D7E2EA]/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TestimonialsSection;
