import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './Pages/home.jsx';
import Login from './Pages/loginPage.jsx';
import InventoryPage from './Pages/inventoryPage.jsx';
import { AuthProvider } from './Contexts/authContext.js';
import { Toaster } from 'react-hot-toast';

// PageWrapper for handling transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x:0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};


const AppContent = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/inventory" element={<PageWrapper><InventoryPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App
function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
