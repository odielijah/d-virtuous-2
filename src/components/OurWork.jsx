import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { works } from "../data/workData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function OurWork() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Selectors
      const stickyHeaderH1 = "#sticky-header h1";
      const cardContainer = "#card-container";
      const cards = ["#card-1", "#card-2", "#card-3"];
      const outerCards = ["#card-1", "#card-3"];

      // Local variables for animation state
      let isGapAnimationCompleted = false;
      let isFlipAnimationCompleted = false;

      const mm = gsap.matchMedia();

      // --- 1. DESKTOP ANIMATION (> 1400px) ---
      mm.add("(min-width: 1400px)", () => {
        gsap.set(cardContainer, { width: "75%", gap: 0 });
        gsap.set(cards, { rotationY: 0, y: 0, rotationZ: 0 });

        // Desktop Header Animation (Linked to the pinned scroll)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.5) {
              const headerProgress = gsap.utils.mapRange(
                0,
                0.5,
                0,
                1,
                progress,
              );
              gsap.set(stickyHeaderH1, {
                y: gsap.utils.mapRange(0, 1, 40, 0, headerProgress),
                opacity: gsap.utils.mapRange(0, 1, 0, 1, headerProgress),
              });
            } else {
              gsap.set(stickyHeaderH1, { y: 0, opacity: 1 });
            }
          },
        });

        // Desktop Card Logic (Pinning, Spreading, Flipping)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Phase 2: Container Width
            if (progress <= 0.25) {
              const widthPercentage = gsap.utils.mapRange(
                0,
                0.25,
                75,
                70,
                progress,
              );
              gsap.set(cardContainer, { width: `${widthPercentage}%` });
            } else {
              gsap.set(cardContainer, { width: "70%" });
            }

            // Phase 3: Gap & Radius
            if (progress >= 0.35 && !isGapAnimationCompleted) {
              gsap.to(cardContainer, { gap: "30px", duration: 0.5 });
              gsap.to(cards, { duration: 0.5, borderRadius: "15px" });
              isGapAnimationCompleted = true;
            } else if (progress < 0.35 && isGapAnimationCompleted) {
              gsap.to(cardContainer, { gap: "0px", duration: 0.5 });
              gsap.to("#card-1", {
                borderRadius: "15px 0 0 15px",
                duration: 0.5,
              });
              gsap.to("#card-2", { borderRadius: "0px", duration: 0.5 });
              gsap.to("#card-3", {
                borderRadius: "0 15px 15px 0",
                duration: 0.5,
              });
              isGapAnimationCompleted = false;
            }

            // Phase 4: Flip
            if (progress >= 0.7 && !isFlipAnimationCompleted) {
              gsap.to(cards, {
                rotationY: 180,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: 0.1,
              });
              gsap.to(outerCards, {
                y: 60,
                rotationZ: (i) => [-10, 10][i],
                duration: 0.75,
                ease: "power3.inOut",
              });
              isFlipAnimationCompleted = true;
            } else if (progress < 0.7 && isFlipAnimationCompleted) {
              gsap.to(cards, {
                rotationY: 0,
                duration: 0.75,
                ease: "power3.inOut",
                stagger: -0.1,
              });
              gsap.to(outerCards, {
                y: 0,
                rotationZ: 0,
                duration: 0.75,
                ease: "power3.inOut",
              });
              isFlipAnimationCompleted = false;
            }
          },
        });
      });

      // --- 2. TABLET/MOBILE ANIMATION (< 1400px) ---
      mm.add("(max-width: 1399px)", () => {
        gsap.set(cardContainer, { clearProps: "width,gap" });
        gsap.set(cards, { clearProps: "transform,borderRadius" });

        // Simple, fast header reveal
        gsap.to(stickyHeaderH1, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stickyHeaderH1, // Trigger on the H1 itself, not the whole section
            start: "top 85%", // Starts when H1 is near the bottom of screen
            end: "top 50%", // Finishes when H1 is in middle of screen
            scrub: 1, // Smooths it out (remove this line if you want it to just play once)
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const getBorderRadiusClass = (index, total) => {
    if (index === 0) return "rounded-l-[15px]";
    if (index === total - 1) return "rounded-r-[15px]";
    return "";
  };

  return (
    <section
      id="our-work"
      className="min-h-screen pb-[100px] w-full bg-white relative z-[2]"
      style={{
        backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    >
      <div
        ref={sectionRef}
          id="card-image-split"
        className="flex flex-col justify-center pointer-events-auto min-h-screen items-center text-white max-[1399px]:flex-col"
      >
        <div
          id="sticky-header"
          className="text-white translate-y-[-50%] max-[1399px]:relative max-[1399px]:top-0 max-[1399px]:left-0 max-[1399px]:transform-none max-[1399px]:mb-[1rem] max-[1399px]:mt-[8rem]"
        >
          <h1 className="relative georgia-pro-light text-[45px] text-black/80 text-center leading-[1] [text-shadow:0_0_10px_rgba(255,255,255,0.8)] tracking-[-0.02em] translate-y-[40px] opacity-0 [will-change:transform,opacity] max-[1399px]:opacity-10 max-[1399px]:text-[35px] max-[1399px]:px-[1rem]">
            How We Drive Change
          </h1>
        </div>

        <div
          id="card-container"
          className="relative w-[75%] flex [will-change:width,transform] translate-y-[40px] [perspective:1000px]
          max-[1399px]:grid max-[1399px]:grid-cols-3 max-[1399px]:items-stretch max-[1399px]:gap-4 max-[1399px]:w-full max-[1399px]:max-w-[1100px] max-[1399px]:translate-y-0 max-[1399px]:px-6
          max-[820px]:grid-cols-1 max-[820px]:max-w-[460px] max-[820px]:gap-6 max-[820px]:px-5"
        >
          {works.map((card, index) => (
            <div
              key={card.id}
              id={card.id}
              className={`relative flex-1 aspect-[5/7] [transform-style:preserve-3d] origin-top 
                ${getBorderRadiusClass(index, works.length)}
                max-[1399px]:w-full max-[1399px]:max-w-none max-[1399px]:rounded-[20px]
                max-[820px]:max-w-[420px] max-[820px]:mx-auto max-[820px]:aspect-[4/5]`}
            >
              {/* Front: Image */}
              <div className="absolute w-full h-full [backface-visibility:hidden] [border-radius:inherit] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Back: Details */}
              <div
                className={`absolute shadow-[0_30px_80px_7px_rgba(0,0,0,0.35)] w-full h-full [backface-visibility:hidden] [border-radius:inherit] overflow-hidden flex flex-col gap-8 2xl:gap-18 items-start [transform:rotateY(180deg)] p-6 xl:p-8 2xl:p-10 max-[1399px]:transform-none
                max-[1399px]:gap-6 max-[1399px]:p-5 max-[820px]:p-7 max-[420px]:p-5
                ${card.bgColor} ${card.textColor}`}
              >
                <span className="text-[28px] lg:text-[35px] pt-serif-bold-italic text-[#C995FF]">
                  {card.step}
                </span>

                <div className="flex justify-center flex-col gap-8 2xl:gap-18 max-[1399px]:gap-6 max-[820px]:gap-10">
                  <h2
                    className="text-[clamp(28px,2.6vw,41px)] pt-serif-regular leading-[1.08] max-w-[450px] my-auto max-[1399px]:text-[clamp(24px,3vw,32px)] max-[820px]:text-[clamp(30px,8vw,41px)]"
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />

                  {/* DESCRIPTION */}
                  <p className="text-[13px] xl:text-[15px] w-full max-w-[255px] sora leading-[1.8] max-[1399px]:text-[12px] max-[820px]:text-[14px]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
