import Lenis from 'lenis';

let lenis = null;
let rafId = 0;

export function startSmoothScroll() {
  if (lenis) return stopSmoothScroll;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  const raf = (t) => {
    lenis.raf(t);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return stopSmoothScroll;
}

export function stopSmoothScroll() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

// Scroll to a section id, through Lenis when it is running.
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: 'auto', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}
