import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [lang, setLang] = useState('ar');
  const [scrolled, setScrolled] = useState(false);
  const [preloadVisible, setPreloadVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener('load', () => {
      setTimeout(() => setPreloadVisible(false), 500);
    });
  }, []);

  const smoothScroll = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    smoothScroll(id);
    setActiveLink(id);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {preloadVisible && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <a href="#home" className="logo">Tech<span>Build</span></a>
          <nav>
            <ul className={menuOpen ? 'show' : ''}>
              <li><a href="#services" className={activeLink === '#services' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#services')}>Services</a></li>
              <li><a href="#projects" className={activeLink === '#projects' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#projects')}>Projects</a></li>
              <li><a href="#contact" className={activeLink === '#contact' ? 'active' : ''} onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a></li>
            </ul>
            <button id="lang-toggle" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              <i className="fas fa-bars"></i>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <h1>Industrial Automation Experts</h1>
          <p>Precision-engineered solutions for machine controls and servo systems.</p>
          <div className="qr-hero">
            <img src="qr-code-vcard.png" alt="Scan My Contact QR Code" />
            <p>Scan to save our contact</p>
          </div>
        </div>
      </section>

      {/* Add Services, Projects, Contact, and Footer sections here just like above using JSX */}

    </div>
  );
};

export default App;
