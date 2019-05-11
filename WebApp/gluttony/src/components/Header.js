import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light" id="main-nav">
        <div className="container">
          <a href="index.html" className="navbar-brand">SPM-Gluttony</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#home-section" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="#team" className="nav-link">Team</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Maps
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <a className="dropdown-item"><Link to="/map">Melbourne</Link></a>
                  <a className="dropdown-item"><Link to="/map">Sydney</Link></a>
                  <a className="dropdown-item"><Link to="/charts">Charts</Link></a>

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
