import { IMG } from '@/assets';
import logo from '@/assets/logo.svg';
import { ROUTES } from '@/constants/ROUTES';
import { useAppSelector } from '@/store/store';
import {
  LayoutDashboard,
  Map,
  CircleDollarSign,
  MapPinned,
  BanknoteArrowUp,
  CircleQuestionMark,
  Gem,
  Settings,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

const NAV_ITEMS = [
  { labelKey: 'dashboard.sidebar.nav.dashboard', icon: LayoutDashboard, to: ROUTES.dashboard.home },
  { labelKey: 'dashboard.sidebar.nav.map', icon: Map, to: ROUTES.dashboard.map },
  { labelKey: 'dashboard.sidebar.nav.fields', icon: MapPinned, to: ROUTES.dashboard.fields },
  {
    labelKey: 'dashboard.sidebar.nav.pricing',
    icon: CircleDollarSign,
    to: ROUTES.dashboard.pricing,
  },
  { labelKey: 'dashboard.sidebar.nav.profitability', icon: BanknoteArrowUp, to: '' },
];

const PREFERENCE_ITEMS = [
  {
    labelKey: 'dashboard.sidebar.preferences.settings',
    icon: Settings,
    to: ROUTES.dashboard.settings,
  },
  {
    labelKey: 'dashboard.sidebar.preferences.help',
    icon: CircleQuestionMark,
    to: ROUTES.dashboard.faq,
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { plan } = useAppSelector(state => state.subscription);

  const isPaidPlan = plan && plan !== 'starter';

  return (
    <div className="px-4 py-7.5 bg-white">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-6">
        <img className="w-10 h-10" src={logo} alt="Logo" />
        <h1>AgroMap</h1>
      </Link>

      <div className="px-3 py-4 flex items-center gap-3 bg-white rounded-2xl shadow-lg mb-8">
        <img className="h-12 w-12" src={IMG.avatarImg} alt="User Avatar" />
        <div>
          <h3 className="text-primary font-bold text-base">Ostap Sydoriak</h3>
          <p className="text-sm text-gray-400">{t('dashboard.sidebar.account.title')}</p>
        </div>
      </div>

      <h2 className="uppercase text-sm text-gray-400 mb-1 ml-3">
        {t('dashboard.sidebar.nav.title')}
      </h2>

      <ul className="flex flex-col gap-1 mb-10">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.to;

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`
                group flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20 translate-x-1'
                    : 'text-gray-600 hover:bg-primary hover:text-white hover:translate-x-2'
                }
              `}
              >
                <Icon
                  size={18}
                  className={`transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`}
                />
                <span
                  className={`text-sm transition-all ${
                    isActive
                      ? 'text-white font-bold'
                      : 'group-hover:text-white group-hover:font-bold'
                  }`}
                >
                  <span>{t(item.labelKey)}</span>{' '}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="uppercase text-sm text-gray-400 mb-1 ml-3">
        {t('dashboard.sidebar.preferences.title')}
      </h2>

      <ul className="flex flex-col gap-0 mb-10">
        {PREFERENCE_ITEMS.map(item => {
          const Icon = item.icon;

          return (
            <li>
              <Link
                className="group flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-primary transition-all duration-300 ease-in-out hover:translate-x-2 "
                to={item.to}
              >
                <Icon className="group-hover:text-white" size={18} />
                <span className="text-sm text-black group-hover:text-white group-hover:font-bold">
                  <span>{t(item.labelKey)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {!isPaidPlan && (
        <div className="bg-white rounded-2xl shadow-lg py-5 px-4 flex flex-col items-center border-2 border-gray-200 mb-40">
          <Gem className="mb-3" size={32} />
          <h3 className="text-black font-bold text-base mb-1 text-center">
            {t('dashboard.sidebar.upgrade.title')}
          </h3>
          <p className="text-black text-sm text-center mb-3">
            {t('dashboard.sidebar.upgrade.description')}
          </p>

          <Link
            to={ROUTES.dashboard.pricing}
            className="bg-primary rounded-xl text-white px-4 py-2 text-sm font-bold"
          >
            {t('dashboard.sidebar.upgrade.button')}
          </Link>
        </div>
      )}

      <div className="text-center text-sm px-6">
        © 2026 AgromMap Inc. {t('main.footer.rights')}.
      </div>
    </div>
  );
};

export default Sidebar;
