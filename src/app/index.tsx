
import { Routes, Route, NavLink } from 'react-router-dom';
import Admin from './pages/Admin';
import Doctor from './pages/Doctor';


function App() {
  return (
    <div>
      <nav>
        <NavLink 
          to="/"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >Admin</NavLink> |{" "}
        <NavLink
          to="/doctor"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >Doctor</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </div>
  );
}

export default App
