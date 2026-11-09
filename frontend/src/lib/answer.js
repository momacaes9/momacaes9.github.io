import kb from '../data/about-monica.json';

/*
 * answerQuestion(question, lang) -> Promise<{ text, section?, matched }>
 *
 * Answers locally from about-monica.json only: no network, no API key, no AI
 * service. Questions in English or Portuguese both match; the answer comes in
 * the selected language. Matching order: exact question, keyword overlap,
 * then typo-tolerant fuzzy keywords. Anything else gets the polite fallback.
 */

const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

const topics = kb.topics.map((t) => ({
  ...t,
  nQuestions: t.questions.map(normalize),
  nKeywords: t.keywords.map(normalize),
}));

// Single-word keywords for typo matching ("pyhton" -> "python").
const singleKeywords = topics.flatMap((t) =>
  t.nKeywords.filter((k) => !k.includes(' ') && k.length >= 4).map((k) => ({ k, id: t.id })),
);

// Optimal-string-alignment distance: Levenshtein plus adjacent swaps, so a
// transposed pair of letters counts as one typo.
function typoDistance(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 99;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

const STOP = new Set([
  'what', 'does', 'that', 'this', 'with', 'have', 'about', 'tell', 'your', 'from', 'when', 'where', 'which', 'there',
  'their', 'would', 'could', 'should', 'know', 'like', 'please', 'monica',
  'sobre', 'como', 'qual', 'quais', 'para', 'esta', 'voce', 'dela', 'onde', 'isso', 'essa', 'esse', 'pode', 'sabe',
  'quero', 'saber', 'ela', 'tem', 'faz',
]);
const GREETING = /^(hi|hello|hey|hiya|oi|ola|bom dia|boa tarde|boa noite|good (morning|afternoon|evening))\b/;

const pick = (field, lang) => field[lang] || field.en;

function keywordScore(topic, q, tokens) {
  let score = 0;
  for (const k of topic.nKeywords) {
    if (k.includes(' ')) {
      if (q.includes(k)) score += 2; // multi-word phrase: strong signal
    } else if (tokens.has(k) || (k.length >= 4 && [...tokens].some((t) => t.startsWith(k)))) {
      score += 1;
    }
  }
  return score;
}

const reply = (t, lang) => ({ text: pick(t.answer, lang), section: t.section, matched: true });

export function localAnswer(question, lang = 'en') {
  const fallback = { text: pick(kb.fallback, lang), section: 'contact', matched: false };
  const q = normalize(question);
  if (!q) return fallback;

  // 1. Exact match on a known question (e.g. the suggestion chips).
  const exact = topics.find((t) => t.nQuestions.includes(q));
  if (exact) return reply(exact, lang);

  // 2. Keyword overlap.
  const tokens = new Set(q.split(' '));
  let best = null;
  let bestScore = 0;
  for (const t of topics) {
    const s = keywordScore(t, q, tokens);
    if (s > bestScore) {
      best = t;
      bestScore = s;
    }
  }
  if (best) return reply(best, lang);

  // 3. Fuzzy keyword match for typos.
  const votes = {};
  for (const tok of tokens) {
    if (tok.length < 4 || STOP.has(tok)) continue;
    const allowed = tok.length >= 7 ? 2 : 1;
    let near = null;
    for (const s of singleKeywords) {
      const dist = typoDistance(tok, s.k);
      if (dist <= allowed && (!near || dist < near.dist)) near = { id: s.id, dist };
    }
    if (near) votes[near.id] = (votes[near.id] || 0) + 1 / (1 + near.dist);
  }
  const top = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  if (top) return reply(topics.find((x) => x.id === top[0]), lang);

  // 4. A greeting gets a friendly nudge instead of the fallback.
  if (GREETING.test(q)) return { text: pick(kb.greetingReply, lang), matched: true };

  return fallback;
}

export async function answerQuestion(question, lang) {
  return localAnswer(question, lang);
}

export const chatIntro = (lang) => ({
  greeting: pick(kb.greeting, lang),
  summary: pick(kb.summary, lang),
  suggestions: pick(kb.suggestions, lang),
});
