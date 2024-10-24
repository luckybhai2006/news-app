import React from 'react';
import { Link } from 'react-router-dom';
import './newsitem.css';

function Navbar(props) {
  return (
    <nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark' id='navbar'>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NewsMonky<span role="img" aria-label="Monkey">🐒</span></Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" id="navbox">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/business">Business</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/general">General</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/health">Health</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/science">Science</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/sports">Sports</Link>
            </li>
            <li className="nav-item" id="navbox">
              <Link className="nav-link" to="/technology">Technology</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Country selector dropdown */}
      {/* <div className="country-selector">
        <select
          className="form-select"
          value={props.selectedCountry}
          onChange={props.handleCountryChange}
        >
          <option value="us">United States</option>
          <option value="in">India</option>
          <option value="gb">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="ca">Canada</option>
        </select>
      </div> */}
      {/* Move the search bar and button outside the collapsible section */}
      <div className="d-flex">
        <input
          id="input"
          className="form-control"
          type="text"
          placeholder="search"
          value={props.searchTerm}
          onChange={props.handleInputChange}
          onKeyDown={props.handleKeyDown}
        />
        <button id='but' className="btn btn-outline-success" onClick={props.handleSearch}>
          Search
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
