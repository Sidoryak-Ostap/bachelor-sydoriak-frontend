import { type TargetAndTransition, type Variants } from 'framer-motion';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const buttonHover: TargetAndTransition = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeInOut' },
};

const buttonTap: TargetAndTransition = {
  scale: 0.95,
};

export { fadeInUp, buttonHover, buttonTap };
