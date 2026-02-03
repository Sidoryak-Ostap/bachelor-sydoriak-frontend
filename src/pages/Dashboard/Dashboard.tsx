import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/ROUTES';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('accessToken');
    navigate(ROUTES.login);
  };

  return (
    <div>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
