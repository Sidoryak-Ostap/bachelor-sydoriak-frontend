import { motion } from 'framer-motion';
import { IMG } from '@/assets';

import { imageVariants, textContainerVariants, listItemVariants } from './animations';
import { useTranslation } from 'react-i18next';

const Info = () => {
  const { t } = useTranslation();

  const infoItems = t('main.info.items', { returnObjects: true }) || [];
  const itemsArray = Array.isArray(infoItems) ? infoItems : [];

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
            <h2 className="text-black font-bold text-4xl mb-6">{t('main.info.title')}</h2>
            <p className="text-base text-gray-400 mb-6">{t('main.info.description')}</p>

            <ul className="flex flex-col gap-4">
              {itemsArray.map((text: string, index: number) => (
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
