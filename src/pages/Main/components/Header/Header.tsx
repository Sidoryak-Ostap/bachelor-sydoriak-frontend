import logo from '@/assets/logo.svg';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../../../../constants/ROUTES';
import { useAppSelector } from '../../../../store/store';
import BurgerMenu from '../BurgerMenu';
import { motion, type Variant } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const { isAuthorized } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const onGetStartedClick = () => {
    if (isAuthorized) navigate(ROUTES.dashboard.home);
    else navigate(ROUTES.login);
  };

  const buttonHover: Variant = {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' },
  };

  const buttonTap: Variant = {
    scale: 0.95,
  };

  const MotionLink = motion.create(Link);

  return (
    <header className="border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto my-0">
        <div className="px-6 py-5 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <img className="w-10 h-10" src={logo} alt="Logo" />
            <h1>AgroMap</h1>
          </div>

          <ul className="hidden gap-8 text-base font-medium mt-1 lg:flex">
            <li>
              <a href="#features">{t('main.header.navlinks.features')}</a>
            </li>
            <li>
              <a href="#solutions">{t('main.header.navlinks.solutions')}</a>
            </li>
            <li>
              <a href="#pricing">{t('main.header.navlinks.pricing')}</a>
            </li>
            <li>
              <a href="#resources">{t('main.header.navlinks.resources')}</a>
            </li>
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            {!isAuthorized && (
              <MotionLink
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="text-primary text-base font-medium border-primary border-3 rounded-xl px-8 py-2 flex items-center justify-center"
                to={ROUTES.login}
              >
                {t('main.header.buttons.login')}
              </MotionLink>
            )}

            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={onGetStartedClick}
              className="cursor-pointer text-white bg-primary text-base font-medium rounded-xl px-8 py-2 flex items-center justify-center border-3 border-transparent"
            >
              {isAuthorized ? t('main.header.buttons.dashboard') : t('main.header.buttons.signup')}
            </motion.button>
          </div>

          <div className="lg:hidden">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
