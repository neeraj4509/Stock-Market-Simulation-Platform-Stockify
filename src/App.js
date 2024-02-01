import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import StockDetailsPage from './pages/StockDetailsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/home" element={<><Navbar /><HomePage /></>} />
        <Route path="/portfolio" element={<><Navbar /><PortfolioPage /></>} />
        <Route path="/stock-details" element={<StockDetailsPage />} />

        
      </Routes>
    </Router>
  );
}

export default App;
