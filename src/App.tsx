import { Outlet } from 'react-router';
import { useAuthCheck } from './hooks/auth/useAuthCheck';

function App() {
  useAuthCheck();

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
