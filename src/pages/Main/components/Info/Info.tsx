import { motion } from 'framer-motion';
import { IMG } from '@/assets';

import { imageVariants, textContainerVariants, listItemVariants } from './animations';

const Info = () => {
  return (
    <div id="solutions" className="w-full bg-[#F5F5F5] py-25 overflow-hidden">
      <div className="max-w-7xl mx-auto my-0 px-5 xl:px-0">
        <div className="flex flex-col md:flex-row gap-15 items-center">
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <img
              className="rounded-2xl w-full shadow-lg"
              src={IMG.fieldImg}
              alt="Field Illustration"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textContainerVariants}
          >
            <h2 className="text-black font-bold text-4xl mb-6">
              Control Your Farm From <br /> Anywhere
            </h2>
            <p className="text-base text-gray-400 mb-6">
              Whether you're in the tractor cab or the office, AgroMap keeps you connected to your
              operation. Sync data across devices and collaborate with your team instantly.
            </p>

            <ul className="flex flex-col gap-4">
              {[
                'Real-time synchronization',
                'Offline mode for remote fields',
                'Multi-user access & permissions',
              ].map((text, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  className="flex items-center gap-3"
                >
                  <img src={IMG.circleTickImg} alt="Tick Icon" />
                  <p className="text-base font-medium">{text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Info;
