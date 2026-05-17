import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from './animations';
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();

  const counterItems = t('main.counter.items', { returnObjects: true }) || [];
  const itemsArray = Array.isArray(counterItems) ? counterItems : [];

  return (
    <div className="w-full h-50 bg-primary flex items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
          margin: '-200px',
        }}
        className="max-w-5xl mx-auto my-0 flex items-center justify-between w-full px-10 xl:px-0"
      >
        {itemsArray.map((item: { value: string; label: string }, index: number) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col gap-2 items-center"
          >
            <h2 className="text-white font-bold text-4xl">{item.value}</h2>
            <p className="text-white text-base opacity-80 text-center">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stats;
