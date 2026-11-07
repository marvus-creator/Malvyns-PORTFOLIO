import { useSyncExternalStore } from 'react';

export interface Route {
  room?: string;
  work?: string;
}

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const route: Route = {};
  for (let i = 0; i < parts.length - 1; i += 2) {
    if (parts[i] === 'room') route.room = parts[i + 1];
    if (parts[i] === 'work') route.work = parts[i + 1];
  }
  return route;
}

export function buildHash(route: Route) {
  const segs: string[] = [];
  if (route.room) segs.push('room', route.room);
  if (route.work) segs.push('work', route.work);
  return segs.length ? `#/${segs.join('/')}` : '#/';
}

let internalDepth = 0;

export function navigate(route: Route, opts: { replace?: boolean } = {}) {
  const hash = buildHash(route);
  if (opts.replace) {
    history.replaceState(null, '', hash === '#/' ? location.pathname + location.search : hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return;
  }
  internalDepth += 1;
  location.hash = hash;
}

export function goBack(fallback: Route) {
  if (internalDepth > 0) {
    internalDepth -= 1;
    history.back();
  } else {
    navigate(fallback, { replace: true });
  }
}

window.addEventListener('popstate', () => {
  if (internalDepth > 0) internalDepth -= 1;
});

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

export function useHash() {
  return useSyncExternalStore(subscribe, () => location.hash, () => '');
}

let doorRect: DOMRect | null = null;
export const setDoorRect = (r: DOMRect | null) => {
  doorRect = r;
};
export const getDoorRect = () => doorRect;
