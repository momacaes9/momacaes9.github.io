import { useEffect } from 'react';
import Chat from './components/Chat';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import { About, Education, Experience, Footer, Hero, Honors, Projects, Skills } from './components/Sections';
import { usePrefersReducedMotion } from './lib/hooks';
import { startSmoothScroll } from './lib/scroll';

export default function App() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    return startSmoothScroll();
  }, [reduced]);

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <Hero />
      <main>
        <About />
        <Education />
        <Experience />
        <Projects />
        <Honors />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Chat />
    </>
  );
}
