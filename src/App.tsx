import { Link } from 'react-router';
import './App.css';

function App() {
  return (
    <div>
      <>
        <h1>Main</h1>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </>
    </div>
  );
}

export default App;
