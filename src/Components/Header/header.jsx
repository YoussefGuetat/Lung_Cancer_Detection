import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/gallery/logo.png";

const Header = () => {
  return (
    <main className="main" id="top">
       <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="118" alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"> </span>
          </button>
          <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
              <li className="nav-item px-2"><a className="nav-link" aria-current="page" href="#about">About Us</a></li>
              <li className="nav-item px-2"><a className="nav-link" href="#departments">Departments</a></li>
              <li className="nav-item px-2"><Link className="nav-link" to="/team">Membership</Link></li>
              <li className="nav-item px-2"><a className="nav-link" href="#findUs">Help </a></li>
              <li className="nav-item px-2"><a className="nav-link" href="#findUs">Contact</a></li>
            </ul>
            <Link className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4" to="/signin">Sign In</Link>
            <Link className="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4" to="/Signup">Sign Up</Link>

          </div>
        </div>
      </nav>
    
    </main>
  );
};

export default Header;
