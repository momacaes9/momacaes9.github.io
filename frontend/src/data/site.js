// Site content in English and Brazilian Portuguese. Only facts Monica provided.
// Edit here to update the page; the chat answers live in about-monica.json.

export const links = {
  github: 'https://github.com/momacaes9',
  linkedin: 'https://www.linkedin.com/in/monicamacaes',
  email: 'momacaes@unc.edu',
  resume: 'https://drive.google.com/file/d/1qevcinwRstTqfCUYD6Q8LNl6G-UmXAla/view?usp=sharing',
};

const photo = '/images/monica-headshot.webp';
const logos = {
  unc: { src: '/logos/unc-chapel-hill.svg', w: 232, h: 72 },
  unsw: { src: '/logos/unsw-sydney.png', w: 330, h: 140 },
};

const en = {
  meta: {
    title: 'Monica Macaes — Growing Dreams',
    description: 'Monica Macaes — Economics & Data Science student at UNC-Chapel Hill.',
  },
  hero: {
    first: 'Monica',
    last: 'Macaes',
    motto: 'Growing Dreams',
    tagline: 'Economics & Data Science at UNC-Chapel Hill. Monetary-policy research, RL datasets, iOS apps and data tools.',
    photo: { src: photo, alt: 'Monica Macaes, Economics and Data Science student at UNC Chapel Hill' },
  },
  about: {
    origin: 'From São Paulo, Brazil',
    intro: [
      'Economics & Data Science student at UNC-Chapel Hill (BS expected May 2030), studying abroad at UNSW Sydney in Spring 2027.',
      'Native Portuguese speaker who also speaks English, Spanish, French and Italian.',
    ],
    currentTitle: 'Currently',
    current: [
      'Building the dataset and oracle pod for the Infinite Policy-Based RL project at AI@UNC',
      'Macroeconomic and monetary-policy research for UNC’s College Fed Challenge team',
      'iOS development in Swift with Carolina App Team',
      'A data chatbot with Supabase + n8n',
    ],
  },
  education: [
    {
      school: 'University of North Carolina at Chapel Hill',
      logo: { ...logos.unc, alt: 'UNC Chapel Hill logo' },
      dates: 'Expected May 2030',
      detail: 'BS, Economics & Data Science',
    },
    {
      school: 'UNSW Sydney',
      logo: { ...logos.unsw, alt: 'UNSW Sydney logo' },
      dates: 'Spring 2027',
      detail: 'Study abroad',
    },
  ],
  skills: {
    Programming: ['Python', 'SQL', 'Swift', 'JavaScript', 'R'],
    'Data & tools': ['pandas', 'NumPy', 'Jupyter', 'Hugging Face', 'REST APIs', 'Excel'],
    Platforms: ['Git', 'GitHub', 'Supabase', 'n8n', 'VS Code'],
    Spoken: ['Portuguese (native)', 'English', 'Spanish', 'French', 'Italian'],
  },
  experience: [
    { org: 'Fed Challenge', role: 'Investment Researcher', summary: 'Macroeconomic and monetary-policy research for UNC’s College Fed Challenge team.' },
    { org: 'AI@UNC', role: 'RL Agent Trainer', summary: 'Builds the dataset and oracle pod for the Infinite Policy-Based RL project (Hugging Face Datasets).' },
    { org: 'International Consultancy Club', role: 'Consultant', summary: 'Client case projects; 1st place in the club’s case competition.' },
    { org: 'Carolina App Team', role: 'iOS Developer', summary: 'iOS development in Swift.' },
    { org: 'ViaMundi Education', role: 'Co-founder', summary: 'International admissions mentorship.' },
    { org: 'Preply', role: 'Math Tutor', summary: '200+ hours of math tutoring since Feb 2026.' },
    { org: 'BRASA (Brazilian Student Association)', role: 'Operations Assistant' },
    { org: 'Women in Consulting', role: 'Member' },
    { org: 'Marathon Team', role: 'Member' },
  ],
  projects: [
    {
      title: 'Creset Growth Radar',
      blurb: '1st place, Product Build Challenge.',
      tags: ['1st place', 'Base44'],
      href: 'https://creset-radar-growth.base44.app/',
      cta: 'Open app',
    },
    {
      title: 'Infinite Policy-Based RL (AI@UNC)',
      blurb: 'Building the dataset and oracle pod with Hugging Face Datasets.',
      tags: ['Hugging Face', 'RL'],
      note: 'Private repository · AI@UNC',
    },
    {
      title: 'Carolina App Team iOS app',
      blurb: 'iOS development in Swift with Carolina App Team.',
      tags: ['Swift', 'iOS'],
      href: 'https://github.com/momacaes9/iOS',
      cta: 'View on GitHub',
    },
    {
      title: 'Data chatbot',
      blurb: 'A data chatbot built with Supabase and n8n.',
      tags: ['Supabase', 'n8n'],
      href: 'https://github.com/momacaes9/n8n',
      cta: 'View on GitHub',
    },
  ],
  honors: [
    { title: '1st place, Product Build Challenge', org: 'Creset x Product Management Club', date: 'Oct 2026' },
    { title: '1st place, Case Competition', org: 'International Consultancy Club', date: '2026' },
    { title: 'Finalist, $1,000 Challenge', org: 'T-0 x Base44', date: 'Sep 2026' },
    { title: 'Top 16 Finalist', org: 'Global Youth Challenge', date: 'Mar 2026' },
  ],
  sections: {
    about: 'About',
    education: 'Education',
    experience: 'Experience',
    projects: 'Projects',
    honors: 'Honors',
    skills: 'Skills',
    contact: 'Contact',
  },
  ui: {
    take: 'Take',
    scroll: 'scroll',
    backToTop: 'Back to top',
    menu: 'Menu',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    langLabel: 'Language',
    contactLede: 'Say hello by email, on LinkedIn, or with the form below.',
    contactLinks: { email: 'Email', linkedin: 'LinkedIn', github: 'GitHub', resume: 'Resume' },
    form: {
      name: 'Name',
      namePh: 'Your name',
      email: 'Email',
      emailPh: 'you@example.com',
      message: 'Message',
      messagePh: 'Write your message…',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Message sent — thank you!',
      error: 'Couldn’t send right now. Please email',
      subject: 'Portfolio contact',
    },
    chat: {
      title: 'Ask about Monica',
      sub: 'Answers only from this site · no AI service',
      placeholder: 'Ask a question…',
      send: 'Send',
      close: 'Close chat',
      toContact: 'Go to Contact →',
      typing: 'Typing',
      question: 'Your question',
    },
  },
};

const pt = {
  meta: {
    title: 'Monica Macaes — Cultivando Sonhos',
    description: 'Monica Macaes — estudante de Economia e Ciência de Dados na UNC-Chapel Hill.',
  },
  hero: {
    first: 'Monica',
    last: 'Macaes',
    motto: 'Cultivando Sonhos',
    tagline: 'Economia e Ciência de Dados na UNC-Chapel Hill. Pesquisa em política monetária, datasets de RL, apps iOS e ferramentas de dados.',
    photo: { src: photo, alt: 'Monica Macaes, estudante de Economia e Ciência de Dados na UNC Chapel Hill' },
  },
  about: {
    origin: 'De São Paulo, Brasil',
    intro: [
      'Estudante de Economia e Ciência de Dados na UNC-Chapel Hill (bacharelado previsto para maio de 2030), com intercâmbio na UNSW Sydney no Spring 2027.',
      'Falante nativa de português; também fala inglês, espanhol, francês e italiano.',
    ],
    currentTitle: 'No momento',
    current: [
      'Construindo o dataset e o oracle pod do projeto Infinite Policy-Based RL no AI@UNC',
      'Pesquisa macroeconômica e de política monetária para a equipe da College Fed Challenge da UNC',
      'Desenvolvimento iOS em Swift no Carolina App Team',
      'Um chatbot de dados com Supabase + n8n',
    ],
  },
  education: [
    {
      school: 'University of North Carolina at Chapel Hill',
      logo: { ...logos.unc, alt: 'Logo da UNC Chapel Hill' },
      dates: 'Previsão: maio de 2030',
      detail: 'Bacharelado (BS) em Economia e Ciência de Dados',
    },
    {
      school: 'UNSW Sydney',
      logo: { ...logos.unsw, alt: 'Logo da UNSW Sydney' },
      dates: 'Spring 2027',
      detail: 'Intercâmbio',
    },
  ],
  skills: {
    Programação: ['Python', 'SQL', 'Swift', 'JavaScript', 'R'],
    'Dados e ferramentas': ['pandas', 'NumPy', 'Jupyter', 'Hugging Face', 'REST APIs', 'Excel'],
    Plataformas: ['Git', 'GitHub', 'Supabase', 'n8n', 'VS Code'],
    Idiomas: ['Português (nativo)', 'Inglês', 'Espanhol', 'Francês', 'Italiano'],
  },
  experience: [
    { org: 'Fed Challenge', role: 'Pesquisadora de Investimentos', summary: 'Pesquisa macroeconômica e de política monetária para a equipe da College Fed Challenge da UNC.' },
    { org: 'AI@UNC', role: 'Treinadora de Agentes de RL', summary: 'Constrói o dataset e o oracle pod do projeto Infinite Policy-Based RL (Hugging Face Datasets).' },
    { org: 'International Consultancy Club', role: 'Consultora', summary: 'Projetos de consultoria para clientes; 1º lugar na competição de cases do clube.' },
    { org: 'Carolina App Team', role: 'Desenvolvedora iOS', summary: 'Desenvolvimento iOS em Swift.' },
    { org: 'ViaMundi Education', role: 'Cofundadora', summary: 'Mentoria para admissões em universidades internacionais.' },
    { org: 'Preply', role: 'Tutora de Matemática', summary: 'Mais de 200 horas de aulas de matemática desde fevereiro de 2026.' },
    { org: 'BRASA (Brazilian Student Association)', role: 'Assistente de Operações' },
    { org: 'Women in Consulting', role: 'Membro' },
    { org: 'Marathon Team', role: 'Membro' },
  ],
  projects: [
    {
      title: 'Creset Growth Radar',
      blurb: '1º lugar no Product Build Challenge.',
      tags: ['1º lugar', 'Base44'],
      href: 'https://creset-radar-growth.base44.app/',
      cta: 'Abrir app',
    },
    {
      title: 'Infinite Policy-Based RL (AI@UNC)',
      blurb: 'Construção do dataset e do oracle pod com Hugging Face Datasets.',
      tags: ['Hugging Face', 'RL'],
      note: 'Repositório privado · AI@UNC',
    },
    {
      title: 'App iOS do Carolina App Team',
      blurb: 'Desenvolvimento iOS em Swift no Carolina App Team.',
      tags: ['Swift', 'iOS'],
      href: 'https://github.com/momacaes9/iOS',
      cta: 'Ver no GitHub',
    },
    {
      title: 'Chatbot de dados',
      blurb: 'Chatbot de dados construído com Supabase e n8n.',
      tags: ['Supabase', 'n8n'],
      href: 'https://github.com/momacaes9/n8n',
      cta: 'Ver no GitHub',
    },
  ],
  honors: [
    { title: '1º lugar, Product Build Challenge', org: 'Creset x Product Management Club', date: 'out. 2026' },
    { title: '1º lugar, Case Competition', org: 'International Consultancy Club', date: '2026' },
    { title: 'Finalista, $1,000 Challenge', org: 'T-0 x Base44', date: 'set. 2026' },
    { title: 'Top 16 (finalista)', org: 'Global Youth Challenge', date: 'mar. 2026' },
  ],
  sections: {
    about: 'Sobre',
    education: 'Formação',
    experience: 'Experiência',
    projects: 'Projetos',
    honors: 'Prêmios',
    skills: 'Habilidades',
    contact: 'Contato',
  },
  ui: {
    take: 'Take',
    scroll: 'role',
    backToTop: 'Voltar ao topo',
    menu: 'Menu',
    toLight: 'Mudar para o modo claro',
    toDark: 'Mudar para o modo escuro',
    langLabel: 'Idioma',
    contactLede: 'Entre em contato por e-mail, pelo LinkedIn ou pelo formulário abaixo.',
    contactLinks: { email: 'E-mail', linkedin: 'LinkedIn', github: 'GitHub', resume: 'Currículo' },
    form: {
      name: 'Nome',
      namePh: 'Seu nome',
      email: 'E-mail',
      emailPh: 'voce@exemplo.com',
      message: 'Mensagem',
      messagePh: 'Escreva sua mensagem…',
      send: 'Enviar mensagem',
      sending: 'Enviando…',
      sent: 'Mensagem enviada — obrigada!',
      error: 'Não foi possível enviar agora. Escreva para',
      subject: 'Contato pelo portfólio',
    },
    chat: {
      title: 'Pergunte sobre a Monica',
      sub: 'Respostas só com base neste site · sem serviço de IA',
      placeholder: 'Faça uma pergunta…',
      send: 'Enviar',
      close: 'Fechar chat',
      toContact: 'Ir para Contato →',
      typing: 'Digitando',
      question: 'Sua pergunta',
    },
  },
};

export const content = { en, pt };

// Section order (ids); labels come from content[lang].sections.
export const sectionIds = ['about', 'education', 'experience', 'projects', 'honors', 'skills', 'contact'];
