import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  // On component mount, check if there's a token in cookies
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          isAuthenticated: true,
          user: decoded,
        });
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  // Login function to set the auth state and store token
  const login = (token) => {
    const decoded = jwtDecode(token);
    
    setAuth({
      isAuthenticated: true,
      user: decoded,
    });
    Cookies.set('token', token, { httpOnly: false }); // Store token in cookies
  };

  // Logout function to clear the auth state and remove token
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    Cookies.remove('token'); // Remove token from cookies
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;


