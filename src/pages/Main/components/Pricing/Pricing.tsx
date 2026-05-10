import { motion } from 'framer-motion';
import { CircleCheckBig } from 'lucide-react';
import { titleVariants, containerVariants, cardVariants } from './animations';
import {
  PLANS,
  type SubscriptionPlan,
  SubscriptionPlanName,
} from '@/constants/subscriptionOptions';

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
          {PLANS.map((plan: SubscriptionPlan) => (
            <motion.div
              variants={cardVariants}
              className="flex-1 flex flex-col p-8 rounded-2xl border-2 border-gray-200"
            >
              <p className="text-primary text-lg font-semibold mb-2">{plan.name}</p>
              <h3 className="text-black font-bold text-4xl mb-2">
                {plan.name === SubscriptionPlanName.Starter ? '' : '$'}
                {plan.regularPrice}
                {plan.name === SubscriptionPlanName.Starter ? (
                  ''
                ) : (
                  <span className="text-lg">/month</span>
                )}
              </h3>
              <p className="text-base text-gray-400 mb-12">{plan.description}</p>
              <ul className="flex flex-col gap-3 mb-17">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2.5">
                    <CircleCheckBig className="text-primary w-5 h-5" />
                    <p className="text-black text-base">{feature}</p>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto bg-primary text-white font-bold text-base py-3 w-full rounded-lg cursor-pointer"
              >
                {plan.name === SubscriptionPlanName.Starter
                  ? 'Start 30-day Free Trial'
                  : 'Subscribe Now'}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
