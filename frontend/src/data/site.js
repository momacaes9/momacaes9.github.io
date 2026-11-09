// Site content. Only facts Monica provided; edit here to update the page.
// The chat answers live in about-monica.json.

export const links = {
  github: 'https://github.com/momacaes9',
  linkedin: 'https://www.linkedin.com/in/monicamacaes',
  email: 'momacaes@unc.edu',
  resume: 'https://drive.google.com/file/d/1qevcinwRstTqfCUYD6Q8LNl6G-UmXAla/view?usp=sharing',
};

export const hero = {
  first: 'Monica',
  last: 'Macaes',
  motto: 'Growing Dreams',
  tagline: 'Economics & Data Science at UNC-Chapel Hill. Monetary-policy research, RL datasets, iOS apps and data tools.',
  photo: {
    src: '/images/monica-headshot.webp',
    alt: 'Monica Macaes, Economics and Data Science student at UNC Chapel Hill',
  },
};

export const about = {
  intro: [
    'Economics & Data Science student at UNC-Chapel Hill (BS expected May 2030), studying abroad at UNSW Sydney in Spring 2027.',
    'Native Portuguese speaker who also speaks English, Spanish, French and Italian.',
  ],
  current: [
    'Building the dataset and oracle pod for the Infinite Policy-Based RL project at AI@UNC',
    'Macroeconomic and monetary-policy research for UNC’s College Fed Challenge team',
    'iOS development in Swift with Carolina App Team',
    'A data chatbot with Supabase + n8n',
  ],
};

export const education = [
  {
    school: 'University of North Carolina at Chapel Hill',
    dates: 'Expected May 2030',
    detail: 'BS, Economics & Data Science',
  },
  {
    school: 'UNSW Sydney',
    dates: 'Spring 2027',
    detail: 'Study abroad',
  },
];

export const skills = {
  Programming: ['Python', 'SQL', 'Swift', 'JavaScript', 'R'],
  'Data & tools': ['pandas', 'NumPy', 'Jupyter', 'Hugging Face', 'REST APIs', 'Excel'],
  Platforms: ['Git', 'GitHub', 'Supabase', 'n8n', 'VS Code'],
  Spoken: ['Portuguese (native)', 'English', 'Spanish', 'French', 'Italian'],
};

export const experience = [
  {
    org: 'Fed Challenge',
    role: 'Investment Researcher',
    summary: 'Macroeconomic and monetary-policy research for UNC’s College Fed Challenge team.',
  },
  {
    org: 'AI@UNC',
    role: 'RL Agent Trainer',
    summary: 'Builds the dataset and oracle pod for the Infinite Policy-Based RL project (Hugging Face Datasets).',
  },
  {
    org: 'International Consultancy Club',
    role: 'Consultant',
    summary: 'Client case projects; 1st place in the club’s case competition.',
  },
  {
    org: 'Carolina App Team',
    role: 'iOS Developer',
    summary: 'iOS development in Swift.',
  },
  {
    org: 'ViaMundi Education',
    role: 'Co-founder',
    summary: 'International admissions mentorship.',
  },
  {
    org: 'Preply',
    role: 'Math Tutor',
    summary: '200+ hours of math tutoring since Feb 2026.',
  },
  {
    org: 'BRASA (Brazilian Student Association)',
    role: 'Operations Assistant',
  },
  { org: 'Women in Consulting', role: 'Member' },
  { org: 'Marathon Team', role: 'Member' },
];

export const projects = [
  {
    title: 'Data chatbot',
    blurb: 'A data chatbot built with Supabase and n8n.',
    tags: ['Supabase', 'n8n'],
    href: 'https://github.com/momacaes9/n8n',
    cta: 'View on GitHub',
  },
  {
    title: 'Creset Growth Radar',
    blurb: '1st place, Product Build Challenge x Creset.',
    tags: ['1st place'],
  },
  {
    title: 'Infinite Policy-Based RL',
    blurb: 'AI@UNC project: building the dataset and oracle pod with Hugging Face Datasets.',
    tags: ['Hugging Face', 'AI@UNC'],
  },
  {
    title: 'This website',
    blurb: 'Personal portfolio built with React and Vite, with an “Ask about Monica” chat that answers from site content only.',
    tags: ['React', 'Vite'],
    href: 'https://github.com/monicamacaes/monicamacaes.github.io',
    cta: 'View source',
  },
];

export const honors = [
  { year: 'Oct 2026', title: 'Product Build Challenge x Creset', medal: '1st place' },
  { year: '', title: 'International Consultancy Club Case Competition', medal: '1st place' },
  { year: 'Sep 2026', title: 'T-0 x Base44 $1,000 Challenge', medal: 'Finalist' },
  { year: '2026', title: 'Global Youth Challenge', medal: 'Top 16' },
];

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'honors', label: 'Honors' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
