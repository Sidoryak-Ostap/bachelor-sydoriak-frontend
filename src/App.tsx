import { Link } from 'react-router';

function App() {
  return (
    <div>
      <>
        <h1>Main</h1>
        <Link to="auth/signup">Signup</Link>
        <Link to="auth/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </>
    </div>
  );
}

export default App;
