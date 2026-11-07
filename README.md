# Nkusi Malvyn — Portfolio v2

An interactive portfolio built as a corridor of five doors. Each door swings open into a room of real work.

**Stack:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis. No 3D engine; the doors are CSS 3D transforms and SVG relief patterns.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5280
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Typecheck + production build into `dist/` |
| `npm run preview` | Serve the built `dist/` on http://localhost:5281 |
| `npm run typecheck` | TypeScript only |

## How it is put together

```
src/
  data/          verified content: site, projects, doors, journey, skills
  lib/route.ts   hash routing (#/room/<door>, #/work/<project>, #/room/<door>/work/<project>)
  lib/motion.ts  GSAP/ScrollTrigger setup, Lenis smooth scroll, scroll locking
  components/
    Loader       door outline draws, counts to 100, splits open like sliding doors
    Hero         name reveal, split-flap ticker, portrait in an arched imigongo doorway
    Corridor     pinned horizontal corridor (desktop) / swipe rail (mobile); open + close choreography
    Door         one door: transom light, relief leaf, brass plate and lever, light spill
    Room         full-screen room that grows out of the door's exact rectangle and shrinks back into it
    WorkPanel    project case study
    About, SelectedWork, Skills (+ AbilityCard), Journey, Contact
  assets/portrait/portfolio-original.png   the original photo, untouched
```

Content lives in `src/data`. To add a project, add an entry to `projects.ts` and list its slug in the matching door in `doors.ts`.

Hash routing means deep links work on any static host with no server rewrites, for example `.../#/room/ai` or `.../#/work/gaia`.

## Accessibility and motion

- Every door is a real `<button>`; ← / → walk the corridor, Enter opens, Esc closes rooms and case studies.
- `prefers-reduced-motion`: no loader sequence, no smooth scroll, no pinning (the corridor becomes a swipe rail), and doors open with a fade.
- Rooms and case studies are modal dialogs; the page behind them is made `inert`.

## Deploy

Live at **https://nkusi-malvyn.vercel.app**.

The Vercel project `nkusi-malvyn` is connected to this repository, so every push to `main` builds and deploys automatically. Vercel detects Vite and runs `npm run build`, serving `dist/`.

To deploy by hand from this folder: `vercel --prod`.

The build uses relative asset paths (`base: './'`) and hash routing, so it also works on any static host with no rewrites.

`docs/index.html` is a small redirect page: the old GitHub Pages address (marvus-creator.github.io/Malvyns-PORTFOLIO) forwards visitors to the Vercel site.

## Content notes

- Every project links to its real repository. Two have no public code: the greenhouse monitor (firmware holds lab network credentials) and RwaSport (private team repo). Both say so on their cards.
- Journey dates come from repository creation dates on GitHub.
- The social preview image is `public/og.jpg`, made from the original portrait.
