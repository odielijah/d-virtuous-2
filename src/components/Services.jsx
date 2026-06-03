import { useState } from "react"; // Added useEffect to track screen size
import { services } from "../data/servicesData";
import { motion } from "framer-motion";

export default function Services() {
  const [openServiceId, setOpenServiceId] = useState(null);

  const toggleService = (id) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };

  const itemVariants = {
    hidden: {
      x: -200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="services"
      className="w-full bg-white z-[2] relative py-40 max-lg:py-20 text-white overflow-x-hidden"
    >
      <div className="w-full max-w-[1220px] mx-auto px-10 max-md:px-5">
        {/* --- Header Section --- */}
        <div className="flex justify-center flex-col items-center w-full mb-24 max-md:mb-12">
          <h1 className="text-[60px] leading-[1] text-black opacity-80 georgia-pro-light [text-shadow:0_0_10px_rgba(255,255,255,0.8)] text-center tracking-[-0.02em] mb-4 max-lg:text-[35px]">
            <span className="italic">With</span> our services
          </h1>

          <p className="text-center text-[14px] text-black opacity-60 sora-light max-w-[250px] font-light">
            We help you achieve more at every stage of business growth
          </p>
        </div>

        {/* --- List Container --- */}
        <motion.div
          id="service-list-container"
          className="flex flex-col w-full"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
        >
          {services.map((service) => {
            const isOpen = openServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                onClick={() => toggleService(service.id)}
                className="flex w-full py-16 border-b border-black/20 items-start justify-center cursor-pointer max-md:flex-col max-md:gap-6 max-md:py-8"
              >
                {/* --- Column 1: Title --- */}
                <div className="flex flex-col gap-2 w-[30%] text-black opacity-80 max-md:w-full max-md:flex-row max-md:justify-between max-md:items-center">
                  <h1 className="georgia-pro-light text-black text-[32px] lg:text-[40px]">
                    {service.title}
                  </h1>
                  <div className="hidden max-md:flex items-center justify-center w-8 h-8">
                    <span
                      className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    >
                      +
                    </span>
                  </div>
                </div>

                {/* --- CONTENT WRAPPER --- */}
                <div
                  className={`
                    md:flex md:flex-1 justify-between
                    max-md:grid max-md:w-full max-md:transition-[grid-template-rows,opacity,margin] max-md:duration-500 max-md:ease-out
                    ${isOpen ? "max-md:grid-rows-[1fr] max-md:opacity-100 max-md:mt-4" : "max-md:grid-rows-[0fr] max-md:opacity-0 max-md:mt-0"}
                `}
                >
                  <div className="overflow-hidden flex md:contents max-md:flex-col max-md:gap-8">
                    <div className="w-full md:w-[35%] xl:w-[30%]">
                      {service.servicesList.map((item) => (
                        <span
                          key={item}
                          className="block sora-light text-black opacity-50 text-[12px] lg:text-[14px] leading-[2]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex-1 md:flex-none md:w-[50%]">
                      <div className="rounded-[12px] overflow-hidden aspect-[16/9] bg-[#1a1a1a]">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
