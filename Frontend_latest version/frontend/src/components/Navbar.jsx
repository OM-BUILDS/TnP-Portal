import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLinkClick = () => {
    setShow(false); 
  };

  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h4 style={{ color: "black" }}>TU Training & Placement Cell</h4>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                HOME
              </Link>
            </li>

            {user && user.role === "Student" && (
              <li>
                <Link to="/jobs" onClick={handleLinkClick}>
                  OPPORTUNITY
                </Link>
              </li>
            )}

            {user && user.role === "Admin" && (
              <li>
                <Link to="/students" onClick={handleLinkClick}>
                  STUDENTS
                </Link>
              </li>
            )}
            <li>
                <Link to="/contacts" onClick={handleLinkClick}>
                  CONTACT
                </Link>
              </li>
            

            <li>
              <Link to="/contact" onClick={handleLinkClick}>
                PEOPLE
              </Link>
            </li>
            <li>
              <Link to="/coordinator" onClick={handleLinkClick}>
                COORDINATORS
              </Link>
            </li>
            {user && user.role === "Admin" && (
            <li>
              <Link to="/placed" onClick={handleLinkClick}>
                PLACEMENT
              </Link>
            </li>)}
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" onClick={handleLinkClick}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
          aria-expanded={show}
          aria-label="Toggle navigation"
        />
      </nav>
    </>
  );
};

export default Navbar;
