import { Outlet, useLocation } from 'react-router';
import Sidebar from '@/components/Dashboard/Sidebar';
import TopBar from '@/components/TopBar';

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const isMapPage = pathname.includes('/map') || pathname.includes('/fields/create');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <aside className="w-74 shrink-0 h-full border-r bg-white border-gray-200 overflow-y-auto custom-scrollbar">
        <Sidebar />
      </aside>

      <main className="flex-1 h-full flex flex-col overflow-hidden">
        <TopBar />
        <div
          className={`flex-1 w-full relative ${isMapPage ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'}`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
