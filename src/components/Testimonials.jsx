import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// Assuming this data structure based on your current code
import { rawTestimonials } from "../data/rawTestimonials";

const testimonials = [
  ...rawTestimonials,
  ...rawTestimonials,
  ...rawTestimonials,
  ...rawTestimonials,
];

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  // Define variants outside the return for cleaner code
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

  return (
    <section
      id="reviews"
      className="bg-white z-[2] w-full overflow-hidden my-[-5px]"
    >
      <div className="w-full min-h-screen relative text-white flex flex-col justify-center py-15 md:py-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-8 md:mb-12 relative z-10 px-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-black/80 max-lg:text-[35px] text-[60px] georgia-pro-light leading-[1] md:leading-[1.1] [text-shadow:0_0_10px_rgba(255,255,255,0.8)] tracking-[-0.02em] mb-4"
          >
            Stories of Impact
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-black/60 text-[14px] sora-light max-w-[400px] mx-auto text-center"
          >
            With countless lives touched, discover how our initiatives are making a real difference every day.
          </motion.p>
        </motion.div>

        {/* Swiper Container */}
        <div className="w-full max-w-[min(92vw,850px)] mx-auto px-4 relative z-10">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onRealIndexChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            modules={[EffectCoverflow, Navigation]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={200}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 400,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={true}
            className="testimonial-swiper !overflow-visible transition-opacity ease-in-out duration-500"
            style={{ paddingBottom: "3rem", paddingTop: "1rem" }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide
                key={`${item.id}-${index}`}
                className="!flex items-center justify-center opacity-30 transition-opacity duration-500 ease-in-out"
              >
                {/* Main Card */}
                <div
                  className="
                    bg-[rgb(240,240,240)] border border-black/10 sora-light 
                    shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1)] rounded-[24px]
                    flex flex-col
                    w-full min-h-[320px] md:min-h-0 md:aspect-[2/1]
                    p-6 md:p-[clamp(24px,2.5vw,40px)] gap-6 md:gap-[clamp(16px,2vw,32px)]
                    relative overflow-hidden
                  "
                >
                  {/* --- TOP ROW (Mobile) / LEFT COLUMN (Desktop) --- */}
                  <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-0 md:w-[40%]">
                    {/* Avatar Image */}
                    {/* <div className="relative flex-shrink-0 rounded-[12px] md:rounded-[16px] overflow-hidden w-[60px] h-[60px] md:w-full md:h-full md:aspect-square">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div> */}

                    {/* Mobile Only: Name and Role next to avatar */}
                    <div className="flex flex-col md:hidden">
                      <h4 className="text-black/80 text-[16px] font-medium leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-black/40 text-[13px] mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* --- RIGHT COLUMN / CONTENT --- */}
                  <div className="flex flex-col justify-between text-left flex-1 relative z-10">
                    {/* Quote */}
                    <p className="text-black/60 text-[15px] font-bold md:text-[clamp(14px,1.4vw,20px)] leading-relaxed sora-light italic">
                      "{item.quote}"
                    </p>

                    {/* Footer Row */}
                    <div className="mt-6 md:mt-auto pt-4 md:border-t md:border-black/10">
                      <div className="flex justify-between items-end">
                        {/* Desktop Only: Name and Role in footer */}
                        <div className="hidden md:block">
                          <h4 className="text-black/80 text-[clamp(16px,1.8vw,18px)] font-medium">
                            {item.name}
                          </h4>
                          <p className="text-black/40 text-[clamp(12px,1.3vw,14px)] mt-1">
                            {item.role}
                          </p>
                        </div>

                        {/* Company Logo/Text (Always bottom right) */}
                        <span className="text-black/40 text-[14px] md:text-[clamp(10px,1.1vw,12px)] font-bold tracking-widest uppercase">
                          {item.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-[6px] z-50 h-10">
            {rawTestimonials.map((_, index) => {
              const isActive = activeIndex % rawTestimonials.length === index;
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    isActive
                      ? "w-[5px] h-[5px] bg-black/80 shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-100"
                      : "w-[5px] h-[5px] bg-black opacity-20 hover:opacity-50"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
