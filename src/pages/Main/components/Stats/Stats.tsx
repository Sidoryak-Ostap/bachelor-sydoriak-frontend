import { motion } from 'framer-motion';
import { STATS_INFO } from './constants';
import { containerVariants, itemVariants } from './animations';

const Stats = () => {
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
        {STATS_INFO.map(({ value, label }, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col gap-2 items-center"
          >
            <h2 className="text-white font-bold text-4xl">{value}</h2>
            <p className="text-white text-base opacity-80 text-center">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stats;
