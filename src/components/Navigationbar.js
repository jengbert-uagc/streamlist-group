import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ cartItemCount }) {
  return (
    <nav className="navigationbar">
      <h1 className="logo">StreamList</h1>

      <div className="navigationlinks">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
          Home
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => isActive ? "active-link" : ""}>
          Movies
        </NavLink>
        <NavLink to="/subscriptions" className={({ isActive }) => isActive ? "active-link" : ""}>
          Subscriptions
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : ""}>
          Cart ({cartItemCount})
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
