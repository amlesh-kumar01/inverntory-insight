import React from 'react';
import Navbar from '../Components/Navbar/navbar.jsx';
import Login from '../Components/Login/login.jsx';

const LoginPage = () => {
    return (
        <div className="home-page">
           <Navbar/>
           <div className='flex justify-center align-center'>
           <Login />
           </div>
        </div>
    );
};

export default LoginPage;