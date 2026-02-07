import logo from '@/assets/logo.svg';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../../../../constants/ROUTES';
import { useAppSelector } from '../../../../store/store';
import BurgerMenu from '../BurgerMenu';

const Header = () => {
  const { isAuthorized } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const onGetStartedClick = () => {
    if (isAuthorized) navigate(ROUTES.dashboard.home);
    else navigate(ROUTES.login);
  };

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
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              className="text-primary text-base font-medium border-primary border-3 rounded-xl px-8 py-2 flex items-center justify-center"
              to={ROUTES.login}
            >
              Log in
            </Link>

            <button
              onClick={onGetStartedClick}
              className="cursor-pointer text-white bg-primary text-base font-medium rounded-xl px-8 py-2 flex items-center justify-center border-3 border-transparent"
            >
              Get Started
            </button>
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
