// Navbar.js
import React from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Logo from '../../assets/logo.png';

import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      
      navigate('/login');
    }).catch((error) => {
      // An error happened.
      console.error('Logout failed', error);
    });
  };

  return (
    <nav>
       <img src={Logo} alt="Logo" />
      <ul>
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : undefined}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'active' : undefined}>
            Portfolio
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
