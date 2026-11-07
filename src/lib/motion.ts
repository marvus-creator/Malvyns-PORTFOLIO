import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let lenis: Lenis | null = null;
let locks = 0;

export function startSmoothScroll() {
  if (reducedMotion() || lenis) return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: string | number, immediate = false) {
  const el = typeof target === 'string' ? document.getElementById(target) : null;
  const y = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY : 0;
  if (lenis && !immediate) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: immediate || reducedMotion() ? 'auto' : 'smooth' });
}

export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    document.documentElement.classList.add('is-locked');
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.classList.remove('is-locked');
    lenis?.start();
  }
}

export const ease = {
  out: 'power3.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
  door: 'power2.inOut',
};
