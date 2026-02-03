import { Outlet } from 'react-router';
import { useAuthCheck } from './hooks/useAuthCheck';

function App() {
  useAuthCheck();

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
