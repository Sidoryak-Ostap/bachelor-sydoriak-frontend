import { Outlet } from 'react-router';
import Sidebar from '@/components/Dashboard/Sidebar';
import TopBar from '@/components/TopBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <aside className="w-74 shrink-0 h-full border-r bg-white border-gray-200 overflow-y-auto custom-scrollbar">
        <Sidebar />
      </aside>

      <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
        <TopBar />
        <div className="w-full px-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
