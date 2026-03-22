import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setCurrentPage('home')}>
        Risk<span className="logo-highlight">IQ</span>
      </div>
      <ul className="navbar-menu">
        <li className={currentPage === 'home' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('home')}>Home</li>
        <li className={currentPage === 'analyzer' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('analyzer')}>Risk Analyzer</li>
        <li className={currentPage === 'about' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('about')}>About Us</li>
        <li className={currentPage === 'contact' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('contact')}>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
