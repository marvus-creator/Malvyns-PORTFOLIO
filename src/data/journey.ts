export interface Milestone {
  month: string;
  year: string;
  title: string;
  body: string;
  tags: string[];
}

export const journey: Milestone[] = [
  {
    month: 'JAN',
    year: '2026',
    title: 'First repository',
    body:
      'I opened my GitHub account and pushed my first repo on 6 January. Four days later came the Smart Finance Tracker, plain HTML and CSS, and the habit of shipping something every week.',
    tags: ['HTML', 'CSS', 'Git'],
  },
  {
    month: 'FEB',
    year: '2026',
    title: 'APIs and fundamentals',
    body:
      'Student APIs, a todo API, the Browser Geolocation API and JavaScript array work. Learning how data moves between a client and a server.',
    tags: ['JavaScript', 'REST', 'Node.js'],
  },
  {
    month: 'MAR',
    year: '2026',
    title: 'CivicEye: the first real platform',
    body:
      'A civic issue tracker for Kigali, with map pins, an upvote heatmap and an English/Kinyarwanda toggle. My first project built for people outside a classroom.',
    tags: ['PHP', 'MySQL', 'Leaflet'],
  },
  {
    month: 'MAY',
    year: '2026',
    title: 'The React era',
    body:
      'Supermarket apps, a React library app deployed on Vercel, and an expense-tracker API. Components, state, and putting things online.',
    tags: ['React', 'Vite', 'Vercel'],
  },
  {
    month: 'JUN',
    year: '2026',
    title: 'Systems that hold data',
    body:
      'TZW Fire Management went live on Vercel and Render after a first version on Laravel, and AgriConnect-RW followed in the same month.',
    tags: ['Express', 'MongoDB', 'Laravel', 'PHP'],
  },
  {
    month: 'JUL',
    year: '2026',
    title: 'Six platforms in one month',
    body:
      'TERRA, ATLAS, SENTINEL, KANOPI, GAIA and Imbuto. Satellites, CRDTs, 3D terrain and on-device AI, then one operating system to join them.',
    tags: ['TypeScript', 'NestJS', 'PostGIS', 'ONNX'],
  },
  {
    month: 'AUG',
    year: '2026',
    title: 'Software meets hardware',
    body:
      'An ESP32 greenhouse monitor with my classmates, streaming sensor data to Supabase. In the same month, GAIA’s web renewal and my first commits to a team codebase, RwaSport.',
    tags: ['ESP32', 'Supabase', 'Teamwork'],
  },
  {
    month: 'SEP',
    year: '2026',
    title: 'NEXUS and Kairo',
    body:
      'A personal digital-world platform on Next.js 16 and NestJS, and a local-first study OS built around my own timetable.',
    tags: ['Next.js', 'Prisma', 'PWA'],
  },
  {
    month: 'NOW',
    year: '2026',
    title: 'Still building',
    body:
      'Learning games for my school, this portfolio, and whatever problem is next. The aim has not changed: build smart systems that solve daily problems.',
    tags: ['Open to work'],
  },
];
