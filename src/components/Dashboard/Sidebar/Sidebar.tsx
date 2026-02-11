import { IMG } from '@/assets';
import logo from '@/assets/logo.svg';
import { ROUTES } from '@/constants/ROUTES';
import {
  LayoutDashboard,
  Map,
  CircleDollarSign,
  MapPinned,
  ChartColumnBig,
  BanknoteArrowUp,
  CircleQuestionMark,
  Gem,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '' },
  { label: 'Map', icon: Map, to: '' },
  { label: 'Fields', icon: MapPinned, to: ROUTES.dashboard.fields },
  { label: 'Pricing', icon: CircleDollarSign, to: ROUTES.dashboard.pricing },
  { label: 'Profitability', icon: BanknoteArrowUp, to: '' },
  { label: 'Reports', icon: ChartColumnBig, to: '' },
];

const PREFERENCE_ITEMS = [
  { label: 'Settings', icon: Settings, to: '' },
  { label: 'Help Center', icon: CircleQuestionMark, to: ROUTES.dashboard.faq },
];

const Sidebar = () => {
  return (
    <div className="px-4 py-7.5 bg-white">
      <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary mb-6">
        <img className="w-10 h-10" src={logo} alt="Logo" />
        <h1>AgroMap</h1>
      </Link>

      <div className="px-3 py-4 flex items-center gap-3 bg-white rounded-2xl shadow-lg mb-8">
        <img className="h-12 w-12" src={IMG.avatarImg} alt="User Avatar" />
        <div>
          <h3 className="text-primary font-bold text-base">Ostap Sydoriak</h3>
          <p className="text-sm text-gray-400">Personal Account</p>
        </div>
      </div>

      <h2 className="uppercase text-sm text-gray-400 mb-1 ml-3">main menu</h2>

      <ul className="flex flex-col gap-0 mb-10">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;

          return (
            <li>
              <Link
                className="group flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-primary transition-all duration-300 ease-in-out hover:translate-x-2 "
                to={item.to}
              >
                <Icon className="group-hover:text-white" size={18} />
                <span className="text-sm text-black group-hover:text-white group-hover:font-bold">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="uppercase text-sm text-gray-400 mb-1 ml-3">Preferences</h2>

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
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="bg-white rounded-2xl shadow-lg py-5 px-4 flex flex-col items-center border-2 border-gray-200 mb-40">
        <Gem className="mb-3" size={32} />
        <h3 className="text-black font-bold text-base mb-1 text-center">Upgrade plan</h3>
        <p className="text-black text-sm text-center mb-3">
          “Upgrade AgroMap today to unlock smarter insights and control”
        </p>

        <Link
          to={ROUTES.dashboard.pricing}
          className="bg-primary rounded-xl text-white px-4 py-2 text-sm font-bold"
        >
          Upgrade Your Plan
        </Link>
      </div>

      <div className="text-center text-sm px-6">© 2026 AgromMap Inc. All rights reserved.</div>
    </div>
  );
};

export default Sidebar;
