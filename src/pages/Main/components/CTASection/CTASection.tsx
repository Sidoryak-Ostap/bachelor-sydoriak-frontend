import { motion } from 'framer-motion';
import { ctaVariants, itemVariants } from './animations';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ctaVariants}
          className="flex flex-col items-center bg-primary rounded-2xl py-15 px-6 shadow-2xl"
        >
          <motion.h2
            variants={itemVariants}
            className="font-extrabold text-white text-center mb-5 text-4xl"
          >
            {t('main.cta.title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base text-gray-300 mb-8 text-center max-w-lg"
          >
            {t('main.cta.description')}
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
            }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white text-primary text-base font-bold rounded-xl py-3 px-8 transition-colors hover:bg-gray-100"
          >
            {t('main.cta.button')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
