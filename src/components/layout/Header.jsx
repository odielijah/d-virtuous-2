import { useState, useEffect } from "react";
import { navLinks } from "../../data/navLinksData";
import { easeInOut, motion } from "framer-motion";

export default function Header({ handleScrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setIsScrolled(false);
      } else {
        setIsScrolled(window.scrollY > 600);
      }
      if (window.scrollY > 100) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeMenuAndScroll = (e, id) => {
    setMenuOpen(false);

    handleScrollToSection(e, id);
  };

  return (
    <header>
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: easeInOut,
        }}
        id="header-container"
        className={`
          fixed left-1/2 -translate-x-1/2 z-[50] text-[#eae7e0] sora-light
          transition-all duration-500 ease-in-out top-[48px] ${
            isScrolled
              ? "max-w-[800px] px-4"
              : "max-w-[1400px] px-[64px] max-xl:px-[35px] max-xl:top-[30px]"
          } w-full`}
      >
        <div
          id="nav-content"
          className="relative flex justify-between items-center w-full backdrop-blur-md bg-black/75 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_30px_rgba(0,0,0,0.1)] p-3 pl-6"
        >
          <div id="logo" className="relative z-[999]">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMenuOpen(false);
              }}
              className={`text-2xl georgia-pro-cond-italic opacity-80 hover:opacity-100 transition-opacity max-md:text-[23px] ${
                menuOpen ? "opacity-100" : ""
              }`}
            >
              D'virtuous
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-15 text-sm tracking-wide">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className={`${isScrolled ? "font-bold" : ""} hover:opacity-100 hover:text-white transition-all duration-300`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#donate"
              className="hidden md:block text-sm sora font-medium text-black bg-[#eae7e0] px-5 py-2 rounded-lg hover:bg-white transition-colors"
            >
              Donate
            </a>

            <div
              id="hamburger"
              className={`z-[999] relative cursor-pointer mr-[24px] hidden max-md:block`}
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <span
                className={`block rounded-[5px] w-[20px] h-[2px] my-[5px] mx-auto bg-white duration-300 ease-in-out opacity-70 ${
                  menuOpen ? "translate-y-[3.5px] rotate-[45deg]" : ""
                }`}
              ></span>

              <span
                className={`block rounded-[5px] w-[20px] h-[2px] my-[5px] mx-auto bg-white duration-300 ease-in-out opacity-70 ${
                  menuOpen ? "translate-y-[-3.5px] rotate-[-45deg]" : ""
                }`}
              ></span>
            </div>
          </div>

          {/* Mobile Nav */}
          <div
            className={`
            absolute top-full mt-1 right-0 w-[220px] 
            flex flex-col gap-5 p-6 md:hidden z-[998]
            backdrop-blur-xl
            bg-black/80
            rounded-2xl
            shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-400 ease-in-out ${
              menuOpen
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => closeMenuAndScroll(e, link.id)}
                  className="text-left text-[14px] sora text-[#eae7e0]/80 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Divider line inside the glass */}
            <div className="h-[1px] w-full bg-white/10" />
            <a
              href="#donate"
              className="text-center text-black text-[14px] sora bg-[#eae7e0] py-2.5 rounded-xl hover:bg-white transition-all active:scale-95"
            >
              Donate
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
