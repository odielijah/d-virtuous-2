import { motion } from "framer-motion";
import { founders } from "../data/foundersData";

export default function Founders() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="founders"
      className="w-full bg-white z-[2] py-20 max-lg:py-20 text-white my-[-5px]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* --- Header --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-black/80 max-lg:text-[35px] text-[60px] georgia-pro-light leading-[1] md:leading-[1.1] 
            [text-shadow:0_0_10px_rgba(255,255,255,0.8)] tracking-[-0.02em] mb-4"
          >
            Meet the <span className="italic">founder</span>
          </motion.h1>
          {/* <motion.p
            variants={itemVariants}
            className="text-black/50 text-[14px] sora-light max-w-[300px] mx-auto text-center"
          >
            We're always up for a good coffee chat
          </motion.p> */}
        </motion.div>

        {/* --- Cards Container --- */}
        <div className="flex justify-center mt-10 max-md:flex-wrap">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: founder.rotation }}
              viewport={{ once: false }}
              whileHover={{
                y: -16,
                rotate: founder.hoverRotate,
                transition: {
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full flex h-full max-w-[280px] min-h-[370px]
              bg-[linear-gradient(rgb(31,31,31)_0%,rgb(22,22,22)_100%)]
              shadow-[-12px_12px_32px_rgba(0,0,0,0.4),-4px_4px_12px_rgba(0,0,0,0.3)]
              border border-white/5 rounded-[10px] 
              p-8 px-13 flex flex-col justify-center items-center cursor-pointer will-change-transform [backface-visibility:hidden]"
            >
              {/* Profile Image with Red Glow Circle */}
              <div className="relative w-26 h-26 mb-3">
                <div className="absolute inset-0 bg-[linear-gradient(rgb(101,14,231)_0%,rgb(71,17,153)_100%)] rounded-full" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-black/20">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    style={{
                      transform: `scale(${founder.imageScale || 1})`,
                      top: founder.top,
                      left: founder.left,
                    }}
                    className="w-full h-full object-cover absolute top-[20%] left-[-7%] origin-center"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-2 text-center">
                <h3
                  className="text-white max-md:text-[35px] text-[40px] georgia-pro-light leading-[1] 
                [text-shadow:0_0_10px_rgba(255,255,255,0.8)] tracking-[-0.02em] max-w-[170px] mx-auto"
                >
                  {founder.name}
                </h3>
                <p className="text-[12px] mt-2 sora-light max-w-[170px] mx-auto opacity-40 uppercase tracking-[0.1em] font-light">
                  {founder.role}
                </p>
              </div>

              {/* Bottom Social Links */}
              <div className="w-full pt-6 flex justify-center gap-6 sora-light">
                {founder.socials.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -2, scale: 1.1 }}
                    className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
