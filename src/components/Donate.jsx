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
      className="w-full bg-white z-[2] relative py-24 text-white sm:py-28 lg:py-36"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
        className="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-center z-10 sm:px-6"
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[1120px] rounded-[22px] bg-[#300078] px-5 py-8 text-white shadow-[0_28px_90px_rgba(48,0,120,0.18)] min-[380px]:px-6 sm:rounded-[26px] sm:px-10 sm:py-10 md:px-14 lg:px-20 lg:py-18"
        >
          <div className="flex flex-col items-start">
            <p className="sora text-[14px] font-normal leading-none text-white/90 sm:text-[15px] md:text-[18px]">
              Bank Name
            </p>
            <div className="mt-4 flex items-center gap-3 md:mt-5 md:gap-4">
              <p className="georgia-pro-light text-[46px] leading-[0.8] tracking-[-0.03em] text-white min-[380px]:text-[54px] md:text-[72px]">
                UBA
              </p>
              <p className="georgia-pro-light max-w-[115px] text-[15px] leading-[0.95] text-white min-[380px]:text-[17px] md:max-w-[130px] md:text-[20px]">
                United Bank Of Africa
              </p>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-white/35 sm:my-10 md:my-14" />

          <div className="grid w-full gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,auto)] md:items-end md:gap-10 lg:gap-12">
            <div className="min-w-0 text-left">
              <p className="sora text-[14px] font-normal leading-none text-white/90 sm:text-[15px] md:text-[18px]">
                Account Number
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="georgia-pro-light mt-4 block max-w-full cursor-pointer text-left text-[clamp(2.35rem,12vw,5.8rem)] leading-[0.82] tracking-[0.01em] text-white transition-opacity duration-300 hover:opacity-80 active:scale-[0.99] min-[380px]:text-[clamp(2.8rem,11vw,5.8rem)] sm:text-[clamp(3.6rem,10vw,5.8rem)] md:mt-6 md:text-[clamp(4.4rem,6.6vw,5.8rem)]"
                aria-label="Copy account number"
              >
                {accountNumber}
              </button>
              <p className="sora mt-3 h-5 text-[12px] text-white/60 sm:mt-4 sm:text-[13px]">
                {copied ? "Copied" : ""}
              </p>
            </div>

            <div className="text-left md:min-w-[240px] md:text-right lg:min-w-[310px]">
              <p className="sora text-[14px] font-normal leading-none text-white/90 sm:text-[15px] md:text-[18px]">
                Account Name
              </p>
              <p className="sora-light mt-4 max-w-[360px] text-[22px] leading-[1.12] tracking-[-0.03em] text-white sm:text-[23px] md:ml-auto md:mt-6 md:text-[28px] lg:text-[32px]">
                Dvirtuous Home For Women And Children
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
