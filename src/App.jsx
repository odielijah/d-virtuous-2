import "./App.css";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

import Header from "./components/layout/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import OurWork from "./components/OurWork";
// import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Founders from "./components/Founders";
import Donate from "./components/Donate";
import Footer from "./components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenis = useLenis();

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element && lenis) {
      // Use Lenis for smooth internal navigation
      lenis.scrollTo(element, { lerp: 0.05 });
    }
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    const lastPosition = sessionStorage.getItem("scrollPosition");

    if (lastPosition && lenis) {
      ScrollTrigger.refresh();
      lenis.scrollTo(parseInt(lastPosition), { immediate: true });

      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", handleLoad);
      };
    }

    // ← this is the fix: no saved position = just show the page
    setIsLoaded(true);

    return () => window.removeEventListener("load", handleLoad);
  }, [lenis]);

  // 6. Single listener to save scroll position and sync GSAP
  useLenis((instance) => {
    sessionStorage.setItem("scrollPosition", instance.scroll);
    ScrollTrigger.update();
  });

  return (
    <ReactLenis
      root
      options={{ restoreScroll: true, lerp: 0.1, duration: 1.5 }}
    >
      {/* 7. Hides the 'glitch' by keeping opacity at 0 until the jump is done */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundColor: "white" }} // Matches your site theme to hide white flashes
      >
        <Header handleScrollToSection={handleScrollToSection} />

        <main className="z-[4] flex mx-auto flex-col place-content-center gap-0 p-0 relative flex-none items-center w-full h-min">
          <Hero />
          <About />
          <OurWork />
          {/* <Services /> */}
          <Testimonials />
          <Stats />
          <Founders />
          <Donate />
        </main>

        <Footer handleScrollToSection={handleScrollToSection} />
      </div>
    </ReactLenis>
  );
}

export default App;
