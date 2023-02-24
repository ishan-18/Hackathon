import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
      <Link to={'/home'} >Home</Link>
      <Link to={'/maps'} >Soil Test</Link>
      <Link to={'/dashboard'} >Forum</Link>
      </div>
    </nav>
  );
}

export default Navbar;
