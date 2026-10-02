// import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { easeInOut, motion, AnimatePresence } from "framer-motion";

import heroImg1 from "/assets/images/top-view-mother-kid-laying-grass 2.avif";
import heroImg2 from "/assets/images/group-african-kids-learning-together 1.avif";
import heroImg3 from "/assets/images/happy-friends-hugging-medium-shot 1.avif";
import heroImg4 from "/assets/images/Layer 2 1.avif";
import heroImg5 from "/assets/images/smiley-young-african-boy-standing-field 1.avif";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];
const SLIDE_DURATION = 8000; // ms each image stays visible

export default function Hero() {
  // --- Slideshow state ---
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  // // --- Clock ---
  // function useCurrentTime() {
  //   const [timeData, setTimeData] = useState({
  //     time: dayjs().format("h:mm"),
  //     period: dayjs().format("A"),
  //   });
  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       setTimeData({
  //         time: dayjs().format("h:mm"),
  //         period: dayjs().format("A"),
  //       });
  //     }, 1000);
  //     return () => clearInterval(id);
  //   }, []);
  //   return timeData;
  // }
  // const { time, period } = useCurrentTime();

  // // --- Day ---
  // function useCurrentDay() {
  //   const [day, setDay] = useState(dayjs().format("ddd"));
  //   useEffect(() => {
  //     const id = setInterval(() => setDay(dayjs().format("ddd")), 60000);
  //     return () => clearInterval(id);
  //   }, []);
  //   return day;
  // }
  // const day = useCurrentDay();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="hero"
      className="p-[32px] bg-white sticky flex flex-col flex-none items-center gap-[32px] z-[2] w-full h-screen max-h-[1000px] top-0 overflow-hidden
      max-xl:p-[16px] max-lg:max-h-[645px]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: easeInOut }}
        id="rounded-container"
        className="relative w-full h-full max-w-[1536px] rounded-[24px] overflow-hidden flex items-center justify-center"
      >
        {/* Crossfading images */}
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={heroImages[currentIndex]}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-[#391954] opacity-90" />

        {/* Hero text content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-end px-5 pb-16 text-center sm:px-8 sm:pb-18 md:px-16 min-[1251px]:hidden">
          <h1 className="georgia-pro-semibold max-w-full whitespace-nowrap text-[clamp(1.8rem,8vw,6rem)] leading-[0.88] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
            Home for Women
          </h1>
          <h1 className="georgia-pro-semibold max-w-full whitespace-nowrap text-[clamp(1.8rem,8vw,6rem)] leading-[0.88] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
            and Children
          </h1>
        </div>

        <div className="relative z-10 hidden h-full w-full px-12 pb-20 min-[1251px]:block 2xl:px-20">
          <h1 className="georgia-pro-semibold absolute bottom-[42%] left-12 max-w-[9ch] text-[clamp(4.5rem,6.5vw,8rem)] leading-[0.88] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] 2xl:left-20">
            Home for Women
          </h1>
          <h1 className="georgia-pro-semibold absolute right-12 bottom-[22%] max-w-[7ch] text-[clamp(4.5rem,6.5vw,8rem)] leading-[0.88] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] 2xl:right-20">
            And
            <br />
            Children
          </h1>
        </div>

        {/* <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          id="time"
          className="absolute bottom-[24px] z-[1] left-[24px] sora-light text-[14px] max-[500px]:text-[12px] text-white"
        >
          {time}
          <span className="max-[500px]:hidden lowercase">{period}</span>
        </motion.div> */}

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          id="scroll-to-explore"
          className="absolute bottom-[24px] z-[1] sora-light text-[14px] bg-clip-text text-transparent 
          bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_20%,#fff_50%,rgba(255,255,255,0.5)_80%)] 
          bg-[length:200%_auto] 
          animate-shimmer"
        >
          Scroll to Explore
        </motion.div>

        {/* <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          id="day"
          className="absolute bottom-[24px] right-[24px] z-[1] sora-light text-[14px] max-[500px]:text-[12px] text-white"
        >
          {day}
        </motion.div> */}
      </motion.div>
    </motion.section>
  );
}
