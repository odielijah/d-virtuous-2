import { useState } from "react";
import { motion } from "framer-motion";

export default function Donate() {
  const [copied, setCopied] = useState(false);
  const accountNumber = "1027462527";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

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
      id="donate"
      className="relative z-[2] w-full bg-white py-16 text-white sm:py-24 lg:py-36"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
        className="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-center z-10 sm:px-6"
      >
        <motion.div variants={containerVariants} className="text-center">
          <motion.h1
            variants={itemVariants}
            className="georgia-pro-light mb-4 text-[clamp(2.2rem,10vw,3.75rem)] leading-[1] tracking-[-0.02em] text-black/80 [text-shadow:0_0_10px_rgba(255,255,255,0.8)] lg:leading-[1.1]"
          >
            Support our Mission
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="sora-light mx-auto max-w-[390px] pb-8 text-[13px] leading-relaxed text-black/50 sm:text-[14px]"
          >
            Your contribution directly funds educational materials, mentorship,
            and skill acquisition for those who need it most.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-[1120px] rounded-[22px] bg-[linear-gradient(rgb(31,31,31)_0%,rgb(22,22,22)_100%)] px-5 py-7 text-white shadow-[0_28px_90px_rgba(48,0,120,0.18)] min-[380px]:px-6 sm:rounded-[26px] sm:px-10 sm:py-10 md:px-14 lg:px-20 lg:py-18"
        >
          <div className="flex flex-col items-start">
            <p className="sora-light text-[14px] font-normal leading-none text-white/90 sm:text-[15px] md:text-[18px]">
              Bank Name
            </p>
            <div className="mt-4 flex items-end gap-3 md:mt-8 md:gap-4">
              <p className="georgia-pro-light text-[clamp(2.75rem,14vw,4.5rem)] leading-[0.8] tracking-[-0.03em] text-white">
                UBA
              </p>
              <p className="georgia-pro-light max-w-[115px] text-[clamp(0.875rem,4vw,1.25rem)] leading-[1] tracking-[0.5px] text-white md:max-w-[130px]">
                United Bank Of Africa
              </p>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-white/35 sm:my-10 md:my-14" />

          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,auto)] lg:items-end lg:gap-12">
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-2">
                <p className="sora-light text-[14px] text-white/90 sm:text-[15px] md:text-[18px]">
                  Account Number
                </p>
                <span
                  aria-live="polite"
                  className={`sora text-[11px] tracking-[0.12em] transition-opacity duration-300 sm:text-[12px] ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Copied!
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="georgia-pro-semibold mt-5 block max-w-full cursor-pointer whitespace-nowrap bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_20%,#fff_50%,rgba(255,255,255,0.5)_80%)] bg-[length:200%_auto]
                bg-clip-text text-left text-[clamp(2rem,10.5vw,4.5rem)] leading-[1] tracking-[0.01em] text-transparent transition-opacity duration-300 animate-shimmer hover:opacity-80 active:scale-[0.99] sm:mt-6 md:text-[clamp(3.5rem,8vw,4.5rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)]"
                aria-label="Copy account number"
              >
                {accountNumber}
              </button>
            </div>

            <div className="text-left lg:min-w-[310px] lg:text-right">
              <p className="sora-light text-[14px] font-normal leading-none text-white/90 sm:text-[15px] md:text-[18px]">
                Account Name
              </p>
              <p className="sora mt-5 max-w-[360px] text-[16px] leading-snug tracking-[0.2px] text-white sm:mt-6 sm:text-[20px] lg:ml-auto lg:mt-8">
                Dvirtuous Home For <br />
                Women And Children
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
