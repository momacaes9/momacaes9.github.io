import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { usePageVisible, usePrefersReducedMotion } from '../lib/hooks';
import { useTheme } from '../lib/theme';

const COUNT = 900;

function makeStars() {
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    // Points spread through a thick spherical shell around the camera.
    const r = 2.5 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  return pos;
}

function Stars({ mouse, animate, light }) {
  const group = useRef();
  const inner = useRef();
  const positions = useMemo(makeStars, []);

  useFrame((_, delta) => {
    if (!animate) return;
    const d = Math.min(delta, 0.05);
    inner.current.rotation.y += d * 0.018; // slow drift
    inner.current.rotation.x += d * 0.006;
    // Tilt toward the mouse with easing (parallax).
    const g = group.current;
    g.rotation.x += (mouse.current.y * 0.18 - g.rotation.x) * 0.04;
    g.rotation.y += (mouse.current.x * 0.25 - g.rotation.y) * 0.04;
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <Points positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color={light ? '#13294b' : '#cfe3f5'}
            size={light ? 0.018 : 0.022}
            sizeAttenuation
            depthWrite={false}
            opacity={light ? 0.45 : 0.85}
          />
        </Points>
      </group>
    </group>
  );
}

export default function StarField() {
  const mouse = useRef({ x: 0, y: 0 });
  const visible = usePageVisible();
  const reduced = usePrefersReducedMotion();
  const animate = visible && !reduced;
  const light = useTheme() === 'light';

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  return (
    <div className="starfield" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        // 'never' stops the render loop entirely while the tab is hidden;
        // with reduced motion the scene is drawn once and stays still.
        frameloop={animate ? 'always' : reduced ? 'demand' : 'never'}
      >
        <Stars mouse={mouse} animate={animate} light={light} />
      </Canvas>
    </div>
  );
}
