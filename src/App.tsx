import { Link, Outlet } from 'react-router';
import { useAuthCheck } from './hooks/useAuthCheck';

function App() {
  useAuthCheck();

  return (
    <div>
      {/* <>
        <Link to="auth/signup">Signup</Link>
        <Link to="auth/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </> */}
      <Outlet />
    </div>
  );
}

export default App;
