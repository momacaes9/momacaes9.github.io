import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/hooks';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// A page section whose direct <Reveal.Item> children fade and rise in, staggered.
export function Section({ id, eyebrow, title, children, className = '' }) {
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
        <span className="eyebrow">{eyebrow}</span>
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
