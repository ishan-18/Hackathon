import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from './favicon.ico'

const Navbar = () => {
  return (
    <nav>
      <div style={{display: "flex"}}>
      <img className="h-8 w-8 mr-5" src={logo} />
      <Link to={'/home'} >Home</Link>
      <Link to={'/maps'} >Soil Test</Link>
      <Link to={'/dashboard'} >Forum</Link>
      <a href='https://agricoop.nic.in/en/Major#gsc.tab=0' target="_blank">Government Policies</a>
      </div>
    </nav>
  );
}

export default Navbar;
