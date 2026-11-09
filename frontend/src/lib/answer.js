import kb from '../data/about-monica.json';

/*
 * answerQuestion(question) -> Promise<{ text, section?, matched }>
 *
 * Answers locally from about-monica.json only: no network, no API key, no AI
 * service. Matching order: exact question, keyword overlap, then typo-tolerant
 * fuzzy keywords. Anything else gets the polite fallback with contact links.
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

const STOP = new Set(['what', 'does', 'that', 'this', 'with', 'have', 'about', 'tell', 'your', 'from', 'when', 'where', 'which', 'there', 'their', 'would', 'could', 'should', 'know', 'like', 'please']);
const GREETING = /^(hi|hello|hey|hiya|oi|ola|good (morning|afternoon|evening))\b/;

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

export function localAnswer(question) {
  const q = normalize(question);
  if (!q) return { text: kb.fallback, section: 'contact', matched: false };

  // 1. Exact match on a known question (e.g. the suggestion chips).
  const exact = topics.find((t) => t.nQuestions.includes(q));
  if (exact) return { text: exact.answer, section: exact.section, matched: true };

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
  if (best) return { text: best.answer, section: best.section, matched: true };

  // 3. Fuzzy keyword match for typos.
  const votes = {};
  for (const tok of tokens) {
    if (tok.length < 4 || STOP.has(tok)) continue;
    const allowed = tok.length >= 7 ? 2 : 1;
    let best = null;
    for (const s of singleKeywords) {
      const dist = typoDistance(tok, s.k);
      if (dist <= allowed && (!best || dist < best.dist)) best = { id: s.id, dist };
    }
    if (best) votes[best.id] = (votes[best.id] || 0) + 1 / (1 + best.dist);
  }
  const top = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  if (top) {
    const t = topics.find((x) => x.id === top[0]);
    return { text: t.answer, section: t.section, matched: true };
  }

  // 4. A greeting gets the intro instead of the fallback.
  if (GREETING.test(q)) {
    return { text: `Hi! ${kb.summary} Try one of the suggested questions.`, matched: true };
  }

  return { text: kb.fallback, section: 'contact', matched: false };
}

export async function answerQuestion(question) {
  return localAnswer(question);
}

export const chatIntro = { greeting: kb.greeting, summary: kb.summary, suggestions: kb.suggestions };
