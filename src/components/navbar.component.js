import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../App.css';

const admin_status = "button-nav";

export default class Navbar extends Component {

  render() {

if (sessionStorage.type === 0) {
  console.log("hello");
  document.getElementById("admin_b").style.display= "inline";
}

    
  
    
    return (
      <nav className="navbar navbar-inverse bg-inverse navbar-expand-lg">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand">ELETRODOS</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav nav">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Calcular</Link>
          </li>
         {/*  <li className="navbar-item">
          <Link to="/AddSoil" className="nav-link">Add Solo</Link>
          </li>
          <li className="navbar-item">
          <Link to="/soils" className="nav-link">Solos</Link>
          </li> */}
          <li className="navbar-item">
          <Link to="/table" className="nav-link">Medidas Guardadas</Link>
          </li>
          <li className="navbar-item">
          <Link to="/chart" className="nav-link">Graph</Link>
          </li>
          <li className="navbar-item">
          <Link to="/Login" className="nav-link">Login</Link>
          </li>
          <li id="admin_b" className="button-nav">
           <Link to="/Administration"  className="nav-link">Administration</Link>
          </li>
        
          
        </ul>
        <ul class="navbar-nav nav ml-auto">
        <label id="session_user"></label>
        </ul>
        </div>
        </div>
      </nav> 
    );
  }
}


