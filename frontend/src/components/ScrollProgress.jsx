import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/hooks';

// Thin bar along the top edge showing how far down the page you are.
export default function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : smooth }} aria-hidden="true" />;
}
