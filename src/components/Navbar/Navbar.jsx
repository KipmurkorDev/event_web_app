import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

function Navbar({ isLoggedin, onLogout }) {
  return (
    <nav className="flex justify-between px-8 pt-10 pb-4 border-[1px] border-b-black items-center">
      <div className="logo">
        <p>EventHive</p>
      </div>
      {isLoggedin ? (
        <>
          <ul className="flex gap-6 nav-link">
            <li>
              <NavLink to="/" activeClassName="active" hover:active>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore">Explore Events</NavLink>
            </li>
            <li>
              <NavLink to="/myevents">My Events</NavLink>
            </li>
            <li>
              <NavLink to="/createevents">Create Events</NavLink>
            </li>
          </ul>
          <div className="inline-flex relative nav-link">
            <FaSearch className="absolute left-0 top-4 text-neutral-500 px-2" />
            <input
              type="text"
              placeholder="Discover events"
              className="py-2 px-6 top-0 left-0 w-[20em] rounded-lg bg-zinc-300 bg-opacity-60 placeholder:text-neutral-500 placeholder:text-md"
            />
          </div>
          <div>
            <button className="nav-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link to="/login">
            <button className="nav-button">Get Started</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedin: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default Navbar;
