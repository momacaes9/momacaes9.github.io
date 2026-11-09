import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/hooks';
import { useLang } from '../lib/i18n';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// A page section whose direct <Item> children fade and rise in, staggered.
// The header is styled like a film slate: "Take 01 · About".
export function Section({ id, take, title, children, className = '' }) {
  const { c } = useLang();
  const reduced = usePrefersReducedMotion();
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      variants={container}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.header className="section-head" variants={item}>
        <span className="slate" aria-hidden="true">
          <span className="slate-clap" />
          <span className="slate-text">
            {c.ui.take} {String(take).padStart(2, '0')} · {title}
          </span>
        </span>
        <h2>{title}</h2>
      </motion.header>
      {children}
    </motion.section>
  );
}

export function Item({ as = 'div', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={item} {...rest}>
      {children}
    </Tag>
  );
}

// Card with a soft glow that follows the mouse (CSS radial-gradient at --mx/--my).
export function SpotlightCard({ as = 'div', className = '', children, ...rest }) {
  const Tag = motion[as];
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag variants={item} className={`card spotlight ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  );
}

export function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t} className="pill">
          {t}
        </li>
      ))}
    </ul>
  );
}

// Thin film-strip divider between sections (sprocket holes along both edges).
export function FilmStrip() {
  return <div className="film-strip" aria-hidden="true" />;
}
