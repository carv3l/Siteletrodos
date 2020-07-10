import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse navbar-expand-lg">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand">ELETRODOS</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav nav">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Calcular</Link>
          </li>
          <li className="navbar-item">
          <Link to="/AddSoil" className="nav-link">Add Solo</Link>
          </li>
          <li className="navbar-item">
          <Link to="/soils" className="nav-link">Solos</Link>
          </li>
          <li className="navbar-item">
          <Link to="/table" className="nav-link">Medidas Guardadas</Link>
          </li>
        </ul>
        </div>
        </div>
      </nav>
    );
  }
}
