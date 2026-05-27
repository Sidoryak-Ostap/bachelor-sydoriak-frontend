import { motion } from 'framer-motion';
import { Map, TrendingUp, FileText } from 'lucide-react';
import { cardVariants, containerVariants, headerVariants } from './animations';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  const featuresItems = t('main.features.items', { returnObjects: true }) || [];
  const featuresArray = Array.isArray(featuresItems) ? featuresItems : [];

  return (
    <div id="features" className="bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto my-0 px-5 xl:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
          className="flex flex-col items-center mb-10"
        >
          <h3 className="uppercase text-primary text-base font-bold mb-4">
            {t('main.features.suptitle')}
          </h3>
          <h2 className="text-black text-[32px] font-bold">{t('main.features.title')}</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap lg:flex-nowrap items-stretch justify-between gap-8"
        >
          {featuresArray.map(({ iconName, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="rounded-2xl p-8 bg-gray-100 flex-1 min-w-75"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center mb-6">
                {iconName === 'Map' && <Map className="text-primary" />}
                {iconName === 'TrendingUp' && <TrendingUp className="text-primary" />}
                {iconName === 'FileText' && <FileText className="text-primary" />}
              </div>
              <h2 className="mb-2.5 text-black text-xl font-bold">{title}</h2>
              <p className="text-base text-gray-400">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
