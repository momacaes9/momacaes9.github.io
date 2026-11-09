import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { answerQuestion, chatIntro } from '../lib/answer';
import { usePrefersReducedMotion } from '../lib/hooks';
import { scrollToId } from '../lib/scroll';

const firstMessage = { from: 'bot', text: `${chatIntro.greeting}\n${chatIntro.summary}` };

// Open by default on desktop; a small bubble on phones and tablets.
const startsOpen = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches;

export default function Chat() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(startsOpen);
  const userOpened = useRef(false);
  const [messages, setMessages] = useState([firstMessage]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [asked, setAsked] = useState(() => new Set());
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, typing, reduced]);

  useEffect(() => {
    if (!open) return;
    // Focus the input only when the visitor opened the chat, not on page load.
    if (userOpened.current) inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (question) => {
    const q = question.trim();
    if (!q || typing) return;
    setInput('');
    setAsked((s) => new Set(s).add(q));
    setMessages((m) => [...m, { from: 'me', text: q }]);
    setTyping(true);
    const [reply] = await Promise.all([
      answerQuestion(q),
      new Promise((r) => setTimeout(r, reduced ? 150 : 650 + Math.random() * 450)),
    ]);
    setTyping(false);
    setMessages((m) => [...m, { from: 'bot', text: reply.text, contact: !reply.matched }]);
  };

  const chips = chatIntro.suggestions.filter((s) => !asked.has(s));

  return (
    <>
      <button
        ref={launcherRef}
        className={`chat-launcher ${open ? 'hidden' : ''}`}
        onClick={() => {
          userOpened.current = true;
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Ask about Monica"
      >
        <span className="spark" aria-hidden="true">✦</span>
        <span className="launcher-text">Ask about Monica</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            role="dialog"
            aria-label="Ask about Monica"
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
          >
            <div className="chat-head">
              <div>
                <strong>Ask about Monica</strong>
                <span className="muted">Answers only from this site · no AI service</span>
              </div>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close chat">
                ×
              </button>
            </div>

            <div className="chat-list" ref={listRef} aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`bubble ${m.from}`}>
                  {m.text.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                  {m.contact && (
                    <button
                      className="link-btn"
                      onClick={() => {
                        setOpen(false);
                        scrollToId('contact');
                      }}
                    >
                      Go to Contact →
                    </button>
                  )}
                </div>
              ))}
              {typing && (
                <div className="bubble bot typing" aria-label="Typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            {chips.length > 0 && (
              <div className="chips">
                {chips.map((s) => (
                  <button key={s} className="chip" onClick={() => ask(s)} disabled={typing}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                maxLength={200}
                aria-label="Your question"
              />
              <button type="submit" className="send" disabled={!input.trim() || typing} aria-label="Send">
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
