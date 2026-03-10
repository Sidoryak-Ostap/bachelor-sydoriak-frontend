import { motion } from 'framer-motion';
import { CircleCheckBig } from 'lucide-react';
import { titleVariants, containerVariants, cardVariants } from './animations';

const Pricing = () => {
  return (
    <div id="pricing" className="bg-white py-25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
          className="text-center text-black font-bold text-4xl mb-15"
        >
          Simple, Transparent Pricing
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row items-stretch justify-between gap-6"
        >
          <motion.div
            variants={cardVariants}
            className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-gray-200"
          >
            <p className="text-primary text-lg font-semibold mb-2">Starter</p>
            <h3 className="text-black font-bold text-4xl mb-2">Free</h3>
            <p className="text-base text-gray-400 mb-12">For those just getting started</p>
            <ul className="flex flex-col gap-3 mb-17">
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Field Mapping Basic</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">1 User Account</p>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer"
            >
              Start 7 day free trial
            </motion.button>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-gray-200"
          >
            <p className="text-primary text-lg font-semibold mb-2">Basic</p>
            <h3 className="text-black font-bold text-4xl mb-2">$14.99</h3>
            <p className="text-base text-gray-400 mb-12">Essential tools for growing farms</p>
            <ul className="flex flex-col gap-3 mb-17">
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Everything in Starter</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Profitability Analysis</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Export Reports</p>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer"
            >
              Subscribe now
            </motion.button>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-primary relative shadow-lg"
          >
            <p className="text-primary text-lg font-semibold mb-2">Pro</p>
            <h3 className="text-black font-bold text-4xl mb-2">$29.99</h3>
            <p className="text-base text-gray-400 mb-12">
              Advanced features for professional farms
            </p>
            <ul className="flex flex-col gap-3 mb-17">
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Unlimited Fields</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Team Collaboration</p>
              </li>
              <li className="flex items-center gap-2.5">
                <CircleCheckBig className="text-primary w-5 h-5" />
                <p className="text-black text-base">Priority Support</p>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer"
            >
              Subscribe now
            </motion.button>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="uppercase text-white font-bold text-xs rounded-2xl bg-primary absolute -top-3.5 right-1/2 translate-x-1/2 px-3 py-1.5"
            >
              Best value
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
