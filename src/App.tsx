import { Outlet } from 'react-router';

import { useAuthInit } from '@/hooks/auth/useAuthInit';
function App() {
  useAuthInit();
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
