import { IMG } from '@/assets';
import { motion } from 'framer-motion';
import { fadeInUp, buttonHover, buttonTap } from './animations';
import { useTranslation } from 'react-i18next';

const Intro = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto my-0 px-5">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <div className="px-4 py-2 text-primary font-bold text-sm uppercase bg-gray-200 rounded-full">
            {t('main.hero.badge')}
          </div>

          <h1 className="text-primary font-black text-5xl text-center mt-6 max-w-3xl w-full ">
            {t('main.hero.title')}
          </h1>

          <p className="text-lg text-gray-400 text-center mt-6 max-w-2xl w-full">
            {t('main.hero.description')}
          </p>

          <div className="flex items-center gap-4 mt-10">
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="cursor-pointer px-8 py-2 text-white bg-primary text-base font-semibold rounded-xl border-3 border-transparent flex items-center justify-center shadow-md capitalize"
            >
              {t('main.hero.buttons.getStarted')}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <img className="w-full rounded-2xl shadow-2xl" src={IMG.uiImg} alt="UI Preview" />
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
