import React from 'react';
import Navbar from '../Components/Navbar/navbar.jsx';
import HeroSection from '../Components/HeroSection/hero.jsx';
const Home = () => {
    return (
        <div className="home-page">
           <Navbar/>
           <HeroSection/>
        </div>
    );
};

export default Home;