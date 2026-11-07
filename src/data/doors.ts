import type { DoorSlug } from './projects';

export type Pattern = 'chevron' | 'diamond' | 'lozenge' | 'grid' | 'triangle';

export interface Door {
  slug: DoorSlug;
  no: string;
  title: string;
  short: string;
  plate: string;
  tagline: string;
  intro: string;
  color: string;
  deep: string;
  light: string;
  pattern: Pattern;
  abilities: string[];
  projects: string[];
}

export const doors: Door[] = [
  {
    slug: 'full-stack',
    no: '01',
    title: 'Full-Stack Development',
    short: 'Full-Stack',
    plate: 'FULL-STACK',
    tagline: 'From the database row to the button you press.',
    intro:
      'Web platforms I carry end to end: schema, API, authentication, payments, the interface, and the deploy. Several of them also answer on a basic phone through SMS and USSD.',
    color: '#9b3d1f',
    deep: '#5e220f',
    light: '#ffb98f',
    pattern: 'chevron',
    abilities: [
      'REST and realtime APIs',
      'Auth, roles and multi-workspace products',
      'Payments with MTN MoMo escrow',
      'SMS / USSD for feature phones',
      'Deployed on Vercel, Render and GitHub Pages',
    ],
    projects: ['gaia', 'agriconnect', 'tembera', 'imbuto', 'nexus', 'tzw', 'civiceye'],
  },
  {
    slug: 'systems',
    no: '02',
    title: 'Software & Systems Engineering',
    short: 'Systems',
    plate: 'SYSTEMS',
    tagline: 'Structure first. Then everything else holds.',
    intro:
      'Platforms that keep their data honest: a national sports system, a 498-place directory with its own CMS, local-first apps that survive without a network, and monorepos with shared packages.',
    color: '#24272e',
    deep: '#111317',
    light: '#cfd8ff',
    pattern: 'diamond',
    abilities: [
      'Monorepos with Turborepo and shared packages',
      'Data integrity: uniqueness, guarded deletes, audit trails',
      'Local-first PWAs that work offline',
      'Directories and admin CMSs with role guards',
      'Working inside a team codebase',
    ],
    projects: ['rwasport', 'tembera', 'nexus', 'kairo', 'tzw'],
  },
  {
    slug: 'ai',
    no: '03',
    title: 'AI & Innovation',
    short: 'AI & Innovation',
    plate: 'AI · INNOVATION',
    tagline: 'Satellites, models and maps, pointed at real problems.',
    intro:
      'The ideas that start with “what if”: a credit score read from orbit, a vision model that runs on the phone, a 3D twin that sees floods coming, a map a whole team can draw on at once.',
    color: '#24397a',
    deep: '#121d44',
    light: '#9fd3ff',
    pattern: 'lozenge',
    abilities: [
      'On-device inference with ONNX Runtime',
      'Satellite imagery: Sentinel-2 NDVI',
      'Geospatial: PostGIS, deck.gl, MapLibre, Leaflet',
      'Realtime collaboration with CRDTs',
      'LLM features with the Claude API',
    ],
    projects: ['terra', 'kanopi', 'sentinel', 'atlas', 'gaia'],
  },
  {
    slug: 'embedded',
    no: '04',
    title: 'Embedded Systems & IoT',
    short: 'Embedded & IoT',
    plate: 'EMBEDDED · IoT',
    tagline: 'Where code meets copper.',
    intro:
      'Software that leaves the screen. A microcontroller reads the world, talks to the cloud over Wi-Fi, and a dashboard reacts in real time. Connecting software logic with physical hardware is what I am levelling up next.',
    color: '#34573f',
    deep: '#18291e',
    light: '#b6ffcf',
    pattern: 'grid',
    abilities: [
      'ESP32 and Arduino firmware (C++)',
      'Sensor reading with fault handling',
      'Wi-Fi → HTTPS → cloud database',
      'Realtime dashboards and automation rules',
    ],
    projects: ['greenhouse'],
  },
  {
    slug: 'projects',
    no: '05',
    title: 'My Projects',
    short: 'Projects',
    plate: 'THE WORK',
    tagline: 'Everything, in one room.',
    intro:
      'The full collection, from the platform that joins everything together to the small tools that taught me how. Every item links to real code.',
    color: '#b07a1e',
    deep: '#6b450a',
    light: '#ffe2a1',
    pattern: 'triangle',
    abilities: [],
    projects: [],
  },
];

export const doorBySlug = (slug: string) => doors.find((d) => d.slug === slug);
