import { useEffect, useRef } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks';

const INTERACTIVE = 'a, button, input, textarea, label, [role="button"], [data-cursor]';

export default function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let shown = false;
    let raf = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // The dot follows the pointer exactly.
      dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (!shown) {
        shown = true;
        pos.x = target.x;
        pos.y = target.y;
        dot.current.classList.add('on');
        ring.current.classList.add('on');
      }
    };
    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE);
      const text = el?.closest('[data-cursor]')?.dataset.cursor || '';
      ring.current.classList.toggle('grow', !!el);
      ring.current.classList.toggle('labeled', !!text);
      label.current.textContent = text;
    };
    const onLeave = () => {
      shown = false;
      dot.current.classList.remove('on');
      ring.current.classList.remove('on');
    };
    // The ring trails behind with a lerp each frame.
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
