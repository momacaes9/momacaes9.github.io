import { useEffect, useState } from 'react';
import { sectionIds } from '../data/site';
import { useActiveSection } from '../lib/hooks';
import { useLang } from '../lib/i18n';
import { scrollToId } from '../lib/scroll';
import { setTheme, useTheme } from '../lib/theme';

function ThemeToggle() {
  const theme = useTheme();
  const { c } = useLang();
  const next = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'light' ? c.ui.toLight : c.ui.toDark;
  return (
    <button className="theme-toggle" onClick={() => setTheme(next)} aria-label={label} title={label}>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function LangToggle() {
  const { lang, setLang, c } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={c.ui.langLabel}>
      <button className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">
        EN
      </button>
      <button className={lang === 'pt' ? 'on' : ''} aria-pressed={lang === 'pt'} onClick={() => setLang('pt')} lang="pt-BR">
        PT{' '}
        <span className="flag" aria-hidden="true">
          🇧🇷
        </span>
      </button>
    </div>
  );
}

export default function Nav() {
  const active = useActiveSection(sectionIds);
  const { c } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`} aria-label="Main">
      <a href="#top" className="logo" onClick={(e) => go(e, 'top')} aria-label={c.ui.backToTop}>
        M
      </a>
      <ul id="nav-links" className="nav-links">
        {sectionIds.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'true' : undefined}
              onClick={(e) => go(e, id)}
            >
              {c.sections[id]}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <LangToggle />
        <ThemeToggle />
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">{c.ui.menu}</span>
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </nav>
  );
}
