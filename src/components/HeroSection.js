import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Welcome to Soil Health</h1>
        <p>Let's nourish our soil for a healthy future !</p>
        <></>
        <Link to={'/maps'} className="hero-btn">Start Analysis</Link>
      </div>
    </section>
  );
}

export default HeroSection;
