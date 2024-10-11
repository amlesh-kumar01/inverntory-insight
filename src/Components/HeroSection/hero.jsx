import React,{useContext} from 'react';
import './hero.css'; 
import { Link } from 'react-router-dom';
import {AuthContext} from '../../Contexts/authContext.js';
const HeroSection = () => {
  const {auth} = useContext(AuthContext);
  const getFirstName = (username) => {
    return username.split(' ')[0];
  };

  return (
    <section className="hero" id='hero-section'>
      <div className="hero-content">
        {auth.isAuthenticated ? <h1 className='text-3xl text-[#381488] '>Hi {getFirstName(auth.user.username)}!</h1> : <></>}
        <h1 className="hero-title">Welcome to Inventory Insight</h1>
        <p className="hero-description">Visualize and manage your warehouse inventory with ease.</p>
        {/* <button className="hero-button">Let's Track</button> */}
        <Link to="/login" className="track-link">Let's Start</Link>
      </div>
      <div className="hero-image">
        <img src="/assets/heroimg.png" alt="Hero" />
      </div>
    </section>
  );
};

export default HeroSection;
