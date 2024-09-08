import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-ops">
        <NavLink 
          to="/" 
          className="sidebarop" 
          activeClassName="active"
          exact
        >
          <span className="icon">🏠</span>
          <p>Home</p>
        </NavLink>

        <NavLink 
          to="/list" 
          className="sidebarop" 
          activeClassName="active"
        >
          <span className="icon">📁</span>
          <p>Categories</p>
        </NavLink>

        <NavLink 
          to="/orders" 
          className="sidebarop" 
          activeClassName="active"
        >
          <span className="icon">🛒</span>
          <p>Orders</p>
        </NavLink>

        <NavLink 
          to="/add" 
          className="sidebarop" 
          activeClassName="active"
        >
          <span className="icon">➕</span>
          <p>Add Item</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
