import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PhotoUpload from './components/PhotoUpload';
import PhotoSearch from './components/PhotoSearch';
import './App.css';
import { FiUpload, FiSearch, FiGrid, FiHome } from 'react-icons/fi';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <h1>PhotoLib</h1>
            </div>
            
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FiHome /> Home
              </NavLink>
              <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FiSearch /> Browse Photos
              </NavLink>
              <NavLink to="/upload" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FiUpload /> Upload Photo
              </NavLink>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<PhotoSearch />} />
            <Route path="/upload" element={<PhotoUpload />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} PhotoLib - Your Personal Photo Library</p>
        </footer>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to PhotoLib</h1>
          <p>Your personal photo library management system</p>
          
          <div className="hero-cta">
            <NavLink to="/upload" className="cta-button primary">
              <FiUpload /> Upload Photos
            </NavLink>
            <NavLink to="/search" className="cta-button secondary">
              <FiSearch /> Browse Library
            </NavLink>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Organize Photos</h3>
            <p>Create directories to keep your photos neatly organized</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Tag & Describe</h3>
            <p>Add tags and descriptions to make photos easily searchable</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find your photos quickly using our powerful search functionality</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>Image Management</h3>
            <p>Upload, edit, and delete your photos with ease</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;