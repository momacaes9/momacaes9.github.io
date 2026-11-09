import { Fragment, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { links, sectionIds } from '../data/site';
import { usePrefersReducedMotion } from '../lib/hooks';
import { useLang } from '../lib/i18n';
import { scrollToId } from '../lib/scroll';
import { Item, Section, SpotlightCard, Tags } from './ui';

const StarField = lazy(() => import('./StarField'));
const ease = [0.22, 1, 0.36, 1];
const take = (id) => sectionIds.indexOf(id) + 1;

// Splits text into words that fade and rise in one after another.
function Words({ text, start = 0, step = 0.06, reduced }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      {i > 0 && ' '}
      <motion.span
        className="word"
        initial={reduced ? false : { opacity: 0, y: '0.6em', filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: start + i * step, ease }}
      >
        {word}
      </motion.span>
    </Fragment>
  ));
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { c, lang } = useLang();
  const { hero } = c;
  const fade = (delay) =>
    reduced ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease } };
  return (
    <header id="top" className="hero">
      <Suspense fallback={null}>
        <StarField />
      </Suspense>
      <div className="hero-inner">
        <div className="hero-text">
          <motion.p className="motto" key={`motto-${lang}`} {...fade(0.05)}>
            {hero.motto}
          </motion.p>
          <h1 aria-label={`${hero.first} ${hero.last}`}>
            <span aria-hidden="true">
              <Words text={hero.first} start={0.15} reduced={reduced} />{' '}
              <em>
                <Words text={hero.last} start={0.3} reduced={reduced} />
              </em>
            </span>
          </h1>
          {/* key: replay the word reveal when the language changes */}
          <p className="tagline" key={`tagline-${lang}`}>
            <Words text={hero.tagline} start={0.55} step={0.035} reduced={reduced} />
          </p>
        </div>
        <motion.div
          className="hero-photo"
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
        >
          <img src={hero.photo.src} alt={hero.photo.alt} width="800" height="800" fetchPriority="high" />
        </motion.div>
      </div>
      <a
        href="#about"
        className="scroll-hint"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('about');
        }}
      >
        <span>{c.ui.scroll}</span>
        <span className="scroll-line" aria-hidden="true" />
      </a>
    </header>
  );
}

export function About() {
  const { c, lang } = useLang();
  const { about } = c;
  return (
    <Section id="about" take={take('about')} title={c.sections.about}>
      <div className="about-grid">
        <Item className="lede">
          <p className="origin">
            <span className="flag" role="img" aria-label={lang === 'pt' ? 'Bandeira do Brasil' : 'Flag of Brazil'}>
              🇧🇷
            </span>{' '}
            {about.origin}
          </p>
          {about.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Item>
        <Item>
          <h3 className="sub">{about.currentTitle}</h3>
          <ul className="current">
            {about.current.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Item>
      </div>
    </Section>
  );
}

export function Education() {
  const { c } = useLang();
  return (
    <Section id="education" take={take('education')} title={c.sections.education}>
      <ol className="timeline">
        {c.education.map((e) => (
          <Item as="li" key={e.school} className="timeline-row">
            <div className="row-meta">{e.dates}</div>
            <div>
              <h3 className="school">
                {e.logo && (
                  <span className="school-logo">
                    <img src={e.logo.src} alt={e.logo.alt} width={e.logo.w} height={e.logo.h} loading="lazy" />
                  </span>
                )}
                <span>{e.school}</span>
              </h3>
              <p>{e.detail}</p>
            </div>
          </Item>
        ))}
      </ol>
    </Section>
  );
}

export function Experience() {
  const { c } = useLang();
  return (
    <Section id="experience" take={take('experience')} title={c.sections.experience}>
      <div className="card-grid exp-grid">
        {c.experience.map((job) => (
          <SpotlightCard as="article" key={job.org} className={`exp-card ${job.summary ? '' : 'compact'}`}>
            <p className="org">{job.org}</p>
            <h3>{job.role}</h3>
            {job.summary && <p className="exp-summary">{job.summary}</p>}
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  const { c } = useLang();
  return (
    <Section id="projects" take={take('projects')} title={c.sections.projects}>
      <div className="card-grid projects">
        {c.projects.map((p) => {
          const linkProps = p.href
            ? { as: 'a', href: p.href, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': 'view' }
            : { as: 'article' };
          return (
            <SpotlightCard key={p.title} className="project-card" {...linkProps}>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="card-bottom">
                <Tags items={p.tags} />
                {p.cta && <span className="cta">{p.cta} ↗</span>}
                {p.note && <span className="project-note">🔒 {p.note}</span>}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </Section>
  );
}

export function Honors() {
  const { c } = useLang();
  return (
    <Section id="honors" take={take('honors')} title={c.sections.honors}>
      <ol className="honors">
        {c.honors.map((h, i) => (
          <Item as="li" key={h.title}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="h-title">
              {h.title}
              <span className="h-org">{h.org}</span>
            </span>
            <span className="h-meta">
              <span className="year">{h.date}</span>
            </span>
          </Item>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  const { c } = useLang();
  return (
    <Section id="skills" take={take('skills')} title={c.sections.skills}>
      <div className="skills-grid">
        {Object.entries(c.skills).map(([group, items]) => (
          <Item key={group}>
            <h3 className="sub">{group}</h3>
            <Tags items={items} />
          </Item>
        ))}
      </div>
    </Section>
  );
}

export function Footer() {
  const { c } = useLang();
  return (
    <footer className="footer">
      <span>© 2026 Monica Macaes · {c.hero.motto}</span>
      <span className="footer-links">
        <a href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </span>
    </footer>
  );
}
