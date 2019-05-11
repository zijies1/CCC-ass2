import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light" id="main-nav">
        <div className="container">
          <a href="/" className="navbar-brand">SPM-Gluttony</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" ><div className="nav-link">Home</div></Link>
              </li>
              <li className="nav-item">
                <Link to="/charts" ><div className="nav-link">Charts</div></Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"
                   href="/"
                   id="navbarDropdown"
                   role="button"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false"
                   style = {{"color":"#007bff;"}}>
                  Maps
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/map"><div className="dropdown-item">Melbourne</div></Link>
                  <Link to="/map"><div className="dropdown-item">Sydney</div></Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


export default connect()(Header);
