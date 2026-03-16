import { CircleQuestionMark, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import Search from '../Search';
import { IMG } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import { NAVIGATION_METADATA } from './navigationConfig';
import { useLogout } from '@/hooks/auth/useLogout';

const LINKS = [
  { label: 'Profile', to: ROUTES.dashboard.profile },
  { label: 'Settings', to: '' },
  { label: 'Pricing', to: '' },
];

const TopBar = () => {
  const pathname = useLocation().pathname;
  const { mutate } = useLogout();

  const currentPage = NAVIGATION_METADATA.find(page => pathname.includes(page.pathname));

  const handleLogout = () => mutate();

  return (
    <div className="p-3 flex items-center justify-between border-b border-gray-200 sticky bg-white top-0 w-full z-10">
      <div>
        <h2 className="text-primary font-semibold text-base mb-1">{currentPage?.title}</h2>
        <p className="text-sm text-gray-400">{currentPage?.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <Search />

        <div className="px-5 border-x-2 border-gray-200  flex items-stretch gap-4 py-1.5">
          <Link to={ROUTES.dashboard.faq}>
            <CircleQuestionMark strokeWidth={1.5} className="text-black" size={24} />
          </Link>
          <Link to="">
            <Settings strokeWidth={1.5} className="text-black" size={24} />
          </Link>
        </div>

        <div className="cursor-pointer relative group shrink-0">
          <img className="h-9 w-9" src={IMG.avatarImg} alt="User Avatar" />

          <div
            className="absolute rounded-xl bg-white shadow-md w-40 top-14 right-0 transition-all duration-200 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                translate-y-2 group-hover:translate-y-0"
          >
            <ul className="py-3 px-4 flex flex-col gap-2 text-base">
              {LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <button
                  className="text-red-600 font-semibold cursor-pointer"
                  onClick={handleLogout}
                >
                  Exit
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
