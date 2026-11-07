export interface SkillGroup {
  label: string;
  note: string;
  items: { name: string; where: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    note: 'What I think in',
    items: [
      { name: 'TypeScript', where: 'GAIA, NEXUS, ATLAS' },
      { name: 'JavaScript', where: 'CivicEye, TZW' },
      { name: 'Python', where: 'TERRA, SENTINEL, KANOPI' },
      { name: 'PHP', where: 'AgriConnect, CivicEye' },
      { name: 'C', where: 'Coursework' },
      { name: 'C++', where: 'ESP32 firmware' },
      { name: 'Java', where: 'Coursework' },
      { name: 'SQL', where: 'Everywhere' },
    ],
  },
  {
    label: 'Interfaces',
    note: 'What people touch',
    items: [
      { name: 'React', where: 'Most of my products' },
      { name: 'Next.js', where: 'NEXUS, Tembera' },
      { name: 'Tailwind CSS', where: 'Imbuto, NEXUS' },
      { name: 'deck.gl', where: 'SENTINEL' },
      { name: 'MapLibre / Leaflet', where: 'GAIA, TERRA, CivicEye' },
      { name: 'GSAP', where: 'This site' },
    ],
  },
  {
    label: 'Back end & data',
    note: 'What keeps it honest',
    items: [
      { name: 'Node.js / Express', where: 'TZW, ATLAS' },
      { name: 'NestJS', where: 'GAIA, NEXUS' },
      { name: 'Laravel', where: 'Imbuto' },
      { name: 'FastAPI', where: 'TERRA' },
      { name: 'PostgreSQL / PostGIS', where: 'GAIA, NEXUS' },
      { name: 'MySQL / MongoDB', where: 'AgriConnect, TZW' },
      { name: 'Prisma / Redis', where: 'NEXUS, Tembera' },
      { name: 'Supabase', where: 'Greenhouse' },
    ],
  },
  {
    label: 'Intelligence & realtime',
    note: 'What makes it feel alive',
    items: [
      { name: 'ONNX Runtime', where: 'KANOPI' },
      { name: 'Sentinel-2 NDVI', where: 'TERRA' },
      { name: 'Yjs CRDTs', where: 'ATLAS' },
      { name: 'WebSockets / Pusher', where: 'ATLAS, RwaSport' },
      { name: 'Claude API', where: 'AgriConnect' },
    ],
  },
  {
    label: 'Hardware & shipping',
    note: 'What gets it out the door',
    items: [
      { name: 'ESP32 / Arduino', where: 'Greenhouse' },
      { name: 'Docker', where: 'GAIA' },
      { name: 'Turborepo', where: 'GAIA, NEXUS' },
      { name: 'SMS / USSD', where: 'GAIA, AgriConnect' },
      { name: 'Vercel / Render', where: 'TZW' },
      { name: 'Git & GitHub', where: '40+ public repos' },
    ],
  },
];

export const abilities = [
  { name: 'Ships end to end', text: 'Schema, API, interface and deploy, by myself when needed.' },
  { name: 'Builds for the field', text: 'Offline-first, SMS/USSD fallbacks, Kinyarwanda in the UI.' },
  { name: 'Thinks in systems', text: 'Five products designed to plug into one platform.' },
  { name: 'Hardware ↔ cloud', text: 'From an ESP32 sensor read to a live dashboard.' },
];
