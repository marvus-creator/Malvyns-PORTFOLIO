import gaia1 from '../assets/projects/gaia-1.jpg';
import gaia2 from '../assets/projects/gaia-2.jpg';
import gaia3 from '../assets/projects/gaia-3.jpg';
import terra1 from '../assets/projects/terra-1.jpg';
import terra2 from '../assets/projects/terra-2.jpg';
import terra3 from '../assets/projects/terra-3.jpg';
import atlas1 from '../assets/projects/atlas-1.jpg';
import atlas2 from '../assets/projects/atlas-2.jpg';
import atlas3 from '../assets/projects/atlas-3.jpg';
import sentinel1 from '../assets/projects/sentinel-1.jpg';
import sentinel2 from '../assets/projects/sentinel-2.jpg';
import sentinel3 from '../assets/projects/sentinel-3.jpg';
import kanopi1 from '../assets/projects/kanopi-1.jpg';
import kanopi2 from '../assets/projects/kanopi-2.jpg';
import kanopi3 from '../assets/projects/kanopi-3.jpg';
import imbuto1 from '../assets/projects/imbuto-1.jpg';
import imbuto2 from '../assets/projects/imbuto-2.jpg';
import imbuto3 from '../assets/projects/imbuto-3.jpg';
import agri1 from '../assets/projects/agriconnect-1.jpg';
import agri2 from '../assets/projects/agriconnect-2.jpg';
import agri3 from '../assets/projects/agriconnect-3.jpg';
import nexus1 from '../assets/projects/nexus-1.jpg';
import nexus2 from '../assets/projects/nexus-2.jpg';
import nexus3 from '../assets/projects/nexus-3.jpg';
import kairo1 from '../assets/projects/kairo-1.jpg';
import kairo2 from '../assets/projects/kairo-2.jpg';
import kairo3 from '../assets/projects/kairo-3.jpg';
import green1 from '../assets/projects/greenhouse-1.jpg';
import green2 from '../assets/projects/greenhouse-2.jpg';
import tzw1 from '../assets/projects/tzw-1.jpg';
import tem1 from '../assets/projects/tembera-1.jpg';
import tem2 from '../assets/projects/tembera-2.jpg';
import tem3 from '../assets/projects/tembera-3.jpg';
import rwa1 from '../assets/projects/rwasport-1.jpg';
import rwa2 from '../assets/projects/rwasport-2.jpg';
import rwa3 from '../assets/projects/rwasport-3.jpg';

export type DoorSlug = 'full-stack' | 'systems' | 'ai' | 'embedded' | 'projects';

export interface Project {
  slug: string;
  name: string;
  headline: string;
  kind: string;
  year: string;
  status: string;
  tone: string;
  doors: DoorSlug[];
  flagship?: boolean;
  problem: string;
  approach: string;
  role: string;
  features: string[];
  stack: string[];
  images: string[];
  repo?: string;
  live?: string;
  note?: string;
}

export const projects: Project[] = [
  {
    slug: 'gaia',
    name: 'GAIA',
    headline: 'The operating system for agriculture.',
    kind: 'Flagship platform',
    year: '2026',
    status: 'Solo build',
    tone: '#3f6b4a',
    doors: ['full-stack', 'ai', 'projects'],
    flagship: true,
    problem:
      'Credit, maps, weather risk, crop disease and markets reach Rwandan farmers through disconnected tools, or not at all, and many of those farmers only own a basic phone.',
    approach:
      'One platform that joins five of my systems: satellite credit scoring (TERRA), live collaborative maps (ATLAS), disaster alerts (SENTINEL), crop diagnosis (KANOPI) and farmer finance (Imbuto). It reaches farmers on the web, on mobile, and through SMS and USSD on feature phones, with a marketplace, cooperative savings pools and a Mission Control dashboard for operations.',
    role: 'Architecture, API, web app, mobile parity and the SMS/USSD channel, built solo.',
    features: [
      'Web, mobile and SMS/USSD access to the same data',
      'Animated 300–850 credit gauge fed by TERRA',
      'Live English / Kinyarwanda toggle and command palette',
      'Guided presenter tour for farmer, lender and government personas',
    ],
    stack: ['TypeScript', 'React', 'NestJS', 'PostGIS', 'MapLibre', 'Turborepo', 'Docker', 'SMS/USSD'],
    images: [gaia3, gaia1, gaia2],
    repo: 'https://github.com/marvus-creator/GAIA',
  },
  {
    slug: 'terra',
    name: 'TERRA',
    headline: 'A credit score written by satellites.',
    kind: 'Satellite credit scoring',
    year: '2026',
    status: 'Shipped v1',
    tone: '#7a6a2c',
    doors: ['ai', 'full-stack', 'projects'],
    flagship: true,
    problem:
      'Smallholder farmers have no collateral and no formal financial history, so banks cannot price a loan for them.',
    approach:
      'TERRA reads Sentinel-2 imagery over each registered field, turns vegetation indices (NDVI) across growing seasons into a crop-health history, and turns that history into a 300–850 score a loan committee can lend against.',
    role: 'Scoring pipeline, API and the full web product, built solo.',
    features: [
      'Three-step farm registration wizard',
      'NDVI living map of every field',
      'Lender view built for loan committees',
      'Step-by-step score story behind every number',
    ],
    stack: ['Python', 'FastAPI', 'Sentinel-2 NDVI', 'React', 'TypeScript', 'Leaflet'],
    images: [terra3, terra1, terra2],
    repo: 'https://github.com/marvus-creator/TERRA',
  },
  {
    slug: 'atlas',
    name: 'ATLAS',
    headline: 'Figma for maps.',
    kind: 'Real-time collaboration',
    year: '2026',
    status: 'Shipped v1',
    tone: '#2f4f86',
    doors: ['ai', 'full-stack', 'projects'],
    flagship: true,
    problem:
      'Planners, NGOs and response teams plan on geography together but edit maps one person at a time, emailing files back and forth.',
    approach:
      'A live satellite map every teammate can draw on at once. Edits and cursors sync through CRDTs (Yjs) over WebSockets, so the map never conflicts, even when people go offline and come back.',
    role: 'Sync server, CRDT document model and the editor UI, built solo.',
    features: [
      'Live multiplayer cursors and edits',
      'Inspector, layers, comments and minimap',
      'Measuring tools and basemap switching',
      'Verified end to end with real multi-client sessions',
    ],
    stack: ['Node.js', 'Yjs CRDTs', 'WebSockets', 'React', 'TypeScript'],
    images: [atlas3, atlas1, atlas2],
    repo: 'https://github.com/marvus-creator/ATLAS',
  },
  {
    slug: 'sentinel',
    name: 'SENTINEL',
    headline: 'See disaster coming.',
    kind: '3D early-warning twin',
    year: '2026',
    status: 'Shipped v1',
    tone: '#253255',
    doors: ['ai', 'projects'],
    flagship: true,
    problem:
      'Floods and landslides hit Rwanda’s hillsides fast, and responders rarely see where the risk is building until it is too late.',
    approach:
      'SENTINEL fuses rainfall with 3D terrain into flood and landslide warnings, rendered as an interactive digital twin of Rwanda. Its audition is a replay of the May 2023 Western Province floods.',
    role: 'Risk model, 3D scene and the operations-room interface, built solo.',
    features: [
      'Replay of the May 2023 Western Province floods',
      'Ranked district risk board',
      'Alert composer drafting English / Kinyarwanda SMS',
      'Printable situation briefings',
    ],
    stack: ['Python', 'deck.gl', 'React', 'TypeScript', 'GIS'],
    images: [sentinel3, sentinel1, sentinel2],
    repo: 'https://github.com/marvus-creator/SENTINEL',
  },
  {
    slug: 'kanopi',
    name: 'KANOPI',
    headline: 'The plant doctor in your pocket.',
    kind: 'On-device AI',
    year: '2026',
    status: 'Shipped v1',
    tone: '#4d6b2f',
    doors: ['ai', 'projects'],
    flagship: true,
    problem:
      'A farmer standing in a field with a sick plant usually has no agronomist nearby and no reliable internet.',
    approach:
      'Photograph a leaf and get the disease and the treatment in about a second. A compressed vision model runs in the browser through ONNX Runtime, so diagnosis keeps working offline in the field.',
    role: 'Model packaging, in-browser inference and the clinic-style app, built solo.',
    features: [
      'Diagnosis with confidence rings and same-day treatment steps',
      'Searchable disease library',
      'Seasonal field guide with a disease-pressure heatmap',
      'Offline caching',
    ],
    stack: ['ONNX Runtime', 'Computer vision', 'Python', 'React', 'TypeScript'],
    images: [kanopi3, kanopi1, kanopi2],
    repo: 'https://github.com/marvus-creator/KANOPI',
  },
  {
    slug: 'imbuto',
    name: 'Imbuto',
    headline: 'Every sale a farmer logs becomes a step toward bankability.',
    kind: 'Agri-fintech',
    year: '2026',
    status: 'Shipped',
    tone: '#8a5a24',
    doors: ['full-stack', 'projects'],
    flagship: true,
    problem:
      'Farmers need input financing before planting season, but lenders cannot see the farm activity that proves they are good for it.',
    approach:
      'Imbuto (“seed”) turns everyday farm activity, from sales and cooperative deliveries to mobile-money patterns, into an explainable credit score. Seven workspaces give the farmer, lender, cooperative manager, field agent, buyer, support and admin each their own dashboard.',
    role: 'Score engine, seven role workspaces and the presenter tour.',
    features: [
      'Seven purpose-built workspaces, 30+ screens',
      'Explainable score engine',
      'Guided presenter tour and command palette',
      'Laravel backend with a React front end',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Laravel'],
    images: [imbuto1, imbuto2, imbuto3],
    repo: 'https://github.com/marvus-creator/Imbuto',
  },
  {
    slug: 'agriconnect',
    name: 'AgriConnect-RW',
    headline: 'Farm to table, with no middlemen.',
    kind: 'Agri-marketplace',
    year: '2026',
    status: 'Shipped',
    tone: '#9e4a25',
    doors: ['full-stack', 'projects'],
    flagship: true,
    problem:
      'Rwandan farmers sell through middlemen who set the price, and buyers in the city have no direct line to the farm.',
    approach:
      'A marketplace that connects farmers, buyers and drivers directly. Produce is listed against transparent national pricing, buyers pay into escrow with MTN MoMo, and verified drivers bid on delivery routes with live GPS tracking. Farmers on basic phones join through USSD and SMS.',
    role: 'Full build: PHP back end, MySQL schema, payments, logistics and the web UI.',
    features: [
      'MTN MoMo escrow payments',
      'Driver bidding with live GPS tracking',
      'AI pricing advisor powered by Claude',
      'USSD/SMS access for basic phones',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'MTN MoMo', 'USSD/SMS', 'Claude API'],
    images: [agri1, agri2, agri3],
    repo: 'https://github.com/marvus-creator/AgriConnect-RW',
  },
  {
    slug: 'nexus',
    name: 'NEXUS',
    headline: 'Your world. Your people. Your places. Your life.',
    kind: 'Personal digital-world platform',
    year: '2026',
    status: 'Built',
    tone: '#3a3f73',
    doors: ['full-stack', 'systems', 'projects'],
    flagship: true,
    problem:
      'A student’s life is spread over a dozen apps: a calendar, a group chat, a feed, a notes app and a marketplace that never talk to each other.',
    approach:
      'People, places, communities, events, learning, goals and planning connected through one interface, with recommendations that learn from what you do and say why.',
    role: 'Monorepo architecture, NestJS API, Prisma schema and the Next.js app.',
    features: [
      'Circles with roles and live chat',
      'Planner that finds your real free time',
      'Market and a double-entry wallet',
      'Admin moderation queue and full audit trail',
    ],
    stack: ['Next.js 16', 'React 19', 'NestJS', 'PostgreSQL 17', 'Prisma', 'Redis', 'Turborepo'],
    images: [nexus1, nexus2, nexus3],
    repo: 'https://github.com/marvus-creator/NEXUS',
  },
  {
    slug: 'kairo',
    name: 'Kairo',
    headline: 'Open it and know exactly what to do right now.',
    kind: 'Local-first study OS',
    year: '2026',
    status: 'Built',
    tone: '#2e5a52',
    doors: ['systems', 'projects'],
    problem:
      'Timetables, study plans and deadlines live in different places, so a student opens three apps just to decide what to do next.',
    approach:
      'A local-first PWA built around a live timetable engine. It shows what is happening now, builds smart study plans, and runs a timer and spaced repetition, all working offline on the device.',
    role: 'Timetable engine, planner logic and the PWA, built solo.',
    features: [
      'Live NOW card driven by the timetable engine',
      'My Day planner and smart study plans',
      'Focus timer and spaced repetition',
      'Installable, works offline',
    ],
    stack: ['TypeScript', 'React', 'Vite', 'PWA', 'Workbox', 'localStorage'],
    images: [kairo1, kairo2, kairo3],
    repo: 'https://github.com/marvus-creator/Kairo',
  },
  {
    slug: 'greenhouse',
    name: 'Aura Greenhouse',
    headline: 'A greenhouse that reports how it feels.',
    kind: 'IoT monitoring',
    year: '2026',
    status: 'Team build',
    tone: '#2f6b4f',
    doors: ['embedded', 'projects'],
    problem:
      'Crops in a greenhouse suffer quickly when temperature and humidity drift, and nobody can stand beside the sensors all day.',
    approach:
      'An ESP32 reads a DHT11 sensor every five seconds and posts temperature and humidity over HTTPS to a Supabase database. Failed readings are logged to their own table, and a live web dashboard charts the data and switches the fan and air inlet on when it gets above 30 °C or 80 % humidity.',
    role: 'Team build with my classmates Brian and Alpha: firmware, database and dashboard.',
    features: [
      'ESP32 firmware with Wi-Fi reconnect and sensor fault handling',
      'HTTPS posts into Supabase every 5 seconds',
      'Error table with row-level security and realtime',
      'Dashboard rules for fan and air inlet',
    ],
    stack: ['ESP32', 'C++ (Arduino)', 'DHT11', 'Supabase', 'PostgreSQL', 'JavaScript', 'Chart.js'],
    images: [green1, green2],
    note: 'Code not published: the firmware holds lab network credentials.',
  },
  {
    slug: 'tzw',
    name: 'TZW Fire Management',
    headline: 'Every extinguisher, inspected on time.',
    kind: 'Management system',
    year: '2026',
    status: 'Live',
    tone: '#b04a2a',
    doors: ['full-stack', 'systems', 'projects'],
    problem:
      'A company with extinguishers across many facilities was tracking inspections and expiry dates by hand.',
    approach:
      'A full-stack management system on a RESTful, microservice-style architecture. Users check extinguisher status, schedule inspections, log maintenance and pull real-time compliance reports, with role-based access for admins, inspectors and users.',
    role: 'API, database model, React front end and deployment.',
    features: [
      'JWT auth with admin, inspector and user roles',
      'Inspection scheduling with notifications',
      'Maintenance logs and compliance reports',
      'Swagger/OpenAPI docs, deployed on Vercel + Render',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'React'],
    images: [tzw1],
    repo: 'https://github.com/marvus-creator/tzw-fire-management',
    live: 'https://tzw-fire-management.vercel.app',
  },
  {
    slug: 'civiceye',
    name: 'CivicEye',
    headline: 'Pin it on the map. The city fixes it.',
    kind: 'Civic tech',
    year: '2026',
    status: 'Built',
    tone: '#6b3a5a',
    doors: ['full-stack', 'projects'],
    problem:
      'Potholes, broken streetlights and water leaks go unreported because there is no simple way for citizens to tell the city.',
    approach:
      'Citizens drop a precise pin on a Leaflet map, others back it with a “Me too” upvote, and the map glows as a live heatmap of what matters most. City officials work from an admin operations centre and mark issues resolved.',
    role: 'Full build: PHP REST API, MySQL schema, mapping UI and admin.',
    features: [
      'Precision incident pins on a live map',
      'Upvote-driven priority heatmap',
      'Instant English / Kinyarwanda toggle',
      'Admin operations centre',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'Leaflet', 'Leaflet.heat'],
    images: [],
    repo: 'https://github.com/marvus-creator/civiceye',
  },
  {
    slug: 'rwasport',
    name: 'RwaSport',
    headline: 'The home of Rwandan sport.',
    kind: 'National sports platform',
    year: '2026',
    status: 'Team build · Live',
    tone: '#1f6b46',
    doors: ['systems', 'full-stack', 'projects'],
    problem:
      'Leagues, federations, school competitions and live matches across Rwanda each needed one shared, reliable home for fixtures, results and standings.',
    approach:
      'A national sports platform with a hub for every sport, from football and basketball to cycling and chess. Each hub carries its own competitions, fixtures, standings and match centre, alongside live scores, news and the Amashuri inter-school games.',
    role: 'Team build with my friends. My lane: data, configuration, realtime and deployment fixes, plus the full-site English / Kinyarwanda / French translation layer.',
    features: [
      'Hubs for 20 sports with fixtures, standings and a match centre',
      'Amashuri inter-school games section',
      'Live scores over a realtime channel',
      'Full site in English, Kinyarwanda and French',
    ],
    stack: ['TypeScript', 'React', 'Vite', 'Node.js', 'Pusher', 'PostgreSQL', 'i18n'],
    images: [rwa1, rwa2, rwa3],
    live: 'https://rwasport.vercel.app/',
    note: 'Code is private to the team.',
  },
  {
    slug: 'tembera',
    name: 'Tembera Rwanda',
    headline: 'Where to? 498 places across Rwanda.',
    kind: 'Tourism directory',
    year: '2026',
    status: 'Team build · Live',
    tone: '#1d5f4a',
    doors: ['full-stack', 'systems', 'projects'],
    problem:
      'Visitors and locals have no single, trustworthy place to find where to eat, stay, pray, get healthcare or go outdoors across Rwanda.',
    approach:
      'A searchable, map-aware directory of places across Rwanda. Nothing on screen is hard-coded: every place, category and city is a database row, ranked by distance from you, with real accounts, saved and visited history, reviews, trip bookings and a full admin CMS.',
    role: 'Team build with my friends. We built it together as one shared codebase, and it lives in each of our portfolios.',
    features: [
      '498 places across 16 categories, searchable and on a live map',
      'Near-you ranking from your location',
      'Accounts with saved places, reviews and trip bookings',
      'Role-guarded admin CMS for places, categories, cities and bookings',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'zod'],
    images: [tem1, tem2, tem3],
    live: 'https://tembera-rwanda-lyart.vercel.app/',
    note: 'Code is private to the team.',
  },
  {
    slug: 'peacequest',
    name: 'PeaceQuest',
    headline: 'Play. Understand. Resolve. Grow.',
    kind: 'Learning game',
    year: '2026',
    status: 'Built',
    tone: '#7a4f8f',
    doors: ['projects'],
    problem: 'Kids aged 8–14 learn conflict resolution better by playing through it than by reading about it.',
    approach: 'An interactive social-emotional learning game with stories, choices and progress for each player.',
    role: 'Solo build.',
    features: ['Interactive SEL scenarios', 'Player progress', 'Classroom-ready demo'],
    stack: ['React', 'Express', 'SQLite'],
    images: [],
    repo: 'https://github.com/marvus-creator/PeaceQuest',
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const flagships = projects.filter((p) => p.flagship);
