import { reducedMotion } from './motion';

export type Theme = 'light' | 'dark';

export const currentTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  const apply = () => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#15161a' : '#eee8dd');
    try {
      localStorage.setItem('nm-theme', theme);
    } catch {
      return;
    } finally {
      window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
    }
  };
  const doc = document as ViewTransitionDoc;
  if (!doc.startViewTransition || !origin || reducedMotion()) {
    apply();
    return;
  }
  const { x, y } = origin;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const vt = doc.startViewTransition(apply);
  vt.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 950, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => {});
}
