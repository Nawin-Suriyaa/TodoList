import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import navbaricon from "../../assets/images/navicon.png";
import logouticon from "../../assets/images/logout.svg";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='pb-4'>
      <nav className="navbar navbar-light bg-white custom-nav">
        <span className="navbar-brand nav-text">
          <img
            src={navbaricon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="icon"
            onClick={() => navigate("/")}
          />
          Todo-List
        </span>
        {location.pathname === '/tasks' && (
          <img
            src={logouticon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="icon"
            onClick={() => window.location.reload()}
          />
        )}
      </nav>
    </div>
  );
};

export default NavBar;
