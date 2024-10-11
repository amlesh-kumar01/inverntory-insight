import React from 'react';
import './hero.css'; 
import { Link } from 'react-router-dom';

const HeroSection = () => {
  
  return (
    <section className="hero" id='hero-section'>
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Inventory Insight</h1>
        <p className="hero-description">Visualize and manage your warehouse inventory with ease.</p>
        {/* <button className="hero-button">Let's Track</button> */}
        <Link to="/login" className="track-link">Let's Start</Link>
      </div>
      <div className="hero-image">
        <img src="/assets/inventory.png" alt="Hero" />
      </div>
    </section>
  );
};

export default HeroSection;
