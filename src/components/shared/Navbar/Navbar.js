import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              exact={true}
              to="/"
              activeClassName="nav-active"
              className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="nav-active"
              to="/add-card"
              className="nav-link">Add card</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}