import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollTrigger, startSmoothScroll, scrollToTarget } from './lib/motion';
import { goBack, parseHash, useHash } from './lib/route';
import { doorBySlug } from './data/doors';
import { projectBySlug } from './data/projects';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import Corridor from './components/Corridor';
import About from './components/About';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Room from './components/Room';
import WorkPanel from './components/WorkPanel';
import CardViewer from './components/CardViewer';
import LightCord from './components/LightCord';

function usePresence(value: string | undefined) {
  const [shown, setShown] = useState(value);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (value) {
      setShown(value);
      setClosing(false);
    } else setClosing(true);
  }, [value]);
  const done = useCallback(() => {
    setShown(undefined);
    setClosing(false);
  }, []);
  return { shown: closing || value ? shown : undefined, closing: closing && !!shown, done };
}

export default function App() {
  const hash = useHash();
  const route = useMemo(() => parseHash(hash), [hash]);
  const roomSlug = route.room && doorBySlug(route.room) ? route.room : undefined;
  const workSlug = route.work && projectBySlug(route.work) ? route.work : undefined;
  const room = usePresence(roomSlug);
  const work = usePresence(workSlug);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardOpen, setCardOpen] = useState(false);
  const card = usePresence(cardOpen ? 'card' : undefined);

  const onReveal = useCallback(() => setRevealed(true), []);
  const onDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    startSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const closeRoom = useCallback(() => goBack({}), []);
  const closeWork = useCallback(() => goBack({ room: roomSlug }), [roomSlug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (card.shown && !card.closing) setCardOpen(false);
      else if (work.shown && !work.closing) closeWork();
      else if (room.shown && !room.closing) closeRoom();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card.shown, card.closing, work.shown, work.closing, room.shown, room.closing, closeRoom, closeWork]);

  const showAbilityCard = useCallback(() => setCardOpen(true), []);
  const hideAbilityCard = useCallback(() => setCardOpen(false), []);

  const overlay = !!(room.shown || work.shown || card.shown);

  return (
    <>
      <a href="#corridor" onClick={(e) => (e.preventDefault(), scrollToTarget('corridor'))} className="sr-only z-[100] rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to the doors
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav hidden={overlay} />
      <main aria-hidden={overlay || undefined} inert={overlay || undefined}>
        <Hero ready={revealed} onAbilityCard={showAbilityCard} />
        <Corridor />
        <About />
        <SelectedWork />
        <Skills onOpenCard={showAbilityCard} />
        <Journey />
        <Contact />
      </main>
      {room.shown && <Room key={room.shown} slug={room.shown} closing={room.closing} onExited={room.done} onClose={closeRoom} />}
      {work.shown && (
        <WorkPanel key={work.shown} slug={work.shown} room={roomSlug} closing={work.closing} onExited={work.done} onClose={closeWork} />
      )}
      {card.shown && <CardViewer closing={card.closing} onClose={hideAbilityCard} onExited={card.done} />}
      <LightCord hidden={overlay || loading} />
      <Cursor />
      {loading && <Loader onReveal={onReveal} onDone={onDone} />}
    </>
  );
}
