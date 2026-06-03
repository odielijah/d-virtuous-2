import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { LeftWreath, RightWreath } from "../assets/icons/Wreaths";
import { brands } from "../data/brandLogos";

import { introText } from "../data/introText";

// Animations
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};
const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const TextReveal = ({ text }) => {
  const container = useRef(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      // Animate the intro text characters as the section scrolls into view.
      gsap.fromTo(
        ".char",
        { opacity: 0.2, color: "#444" },
        {
          opacity: 0.8,
          color: "black",
          duration: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    },
    { scope: container, dependencies: [text] },
  );

  return (
    <div ref={container} className="max-w-[1400px] z-10 mx-auto text-center">
      <div className="leading-[1.1] tracking-tight">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: "0.25em" }}
          >
            {word.split("").map((char, j) => (
              <span key={j} className="char inline-block">
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function About() {
  const logosBlock = [...brands, ...brands];

  return (
    <section
      id="about"
      className="h-screen w-full bg-white relative z-[2] flex flex-col max-md:h-[800px]"
      style={{
        backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 flex-1 w-full text-black p-10 max-md:p-4 max-md:pt-9 flex justify-center items-center text-center georgia-pro-light text-[35px] min-[1000px]:text-[50px] min-[1300px]:text-[60px]"
      >
        <motion.div variants={itemVariants}>
          <TextReveal text={introText} />
        </motion.div>
      </motion.div>

      {/* Marquee Section */}
      <div className="w-full flex items-center justify-center gap-[50px] max-w-[1400px] mx-auto !text-black pb-[5rem] px-10 max-md:flex-col max-md:gap-5 max-md:px-0">
        <div className="flex items-center gap-3 opacity-70 select-none shrink-0">
          <LeftWreath className="max-md:w-[25px]" />
          <div className="text-center sora leading-[1.3] text-[14px] max-md:text-[12px]">
            <p className="mb-1">Trusted by these</p>
            <p>Organizations</p>
          </div>
          <RightWreath className="max-md:w-[25px]" />
        </div>

        <div className="w-full flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] max-md:flex-none max-md:[mask-image:none]">
          <div className="flex items-center w-max animate-scroll hover:[animation-play-state:paused]">
            <div className="flex items-center">
              {logosBlock.map((brand, index) => (
                <span
                  key={`${brand.id}-${index}`}
                  className="mr-16 flex h-16 w-[200px] flex-shrink-0 items-center justify-center opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer max-md:mr-8 max-md:h-12 max-md:w-[140px]"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="block max-h-full max-w-full object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
