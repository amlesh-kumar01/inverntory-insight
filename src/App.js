import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home.jsx";
import Login from "./Pages/loginPage.jsx";
import { AuthProvider } from "./Contexts/authContext.js";
import InventoryPage from "./Pages/inventoryPage.jsx";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
