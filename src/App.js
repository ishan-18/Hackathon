import React from 'react';
import './App.css';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Mapp from './components/Mapp';
import Navbar from './components/Navbar';
import StepwiseCards from './components/Stepwise';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <StepwiseCards />
      <Mapp />
      <Footer />
    </div>
  );
}

export default App;
