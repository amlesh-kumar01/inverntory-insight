import React, { useContext } from 'react';
import Navbar from '../Components/Navbar/navbar';
import Sidebar from '../Components/Sidebar/sidebar';
import { AuthContext } from '../Contexts/authContext.js';
import { Link } from 'react-router-dom';

const InventoryPage = () => {
  const {auth} = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {auth.isAuthenticated ? (
          <>
            <Sidebar />
            <div className="flex-1 p-4">
              {/* Main content goes here */}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <h2 className="text-4xl mb-4">Please Login to View this page</h2>
            <Link to="/login" className="text-3xl text-blue-500 hover:underline">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
