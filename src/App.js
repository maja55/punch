import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Button from './components/Button';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Approach from './pages/Approach';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Work from './pages/Work';
import Project from './pages/Project';

import data from './data.json'

const App = () => {
  let location = useLocation();
  const [isMenuOpen, toggleMenu] = useState(() => false);
  const [isLoaded, setLoaded] = useState(() => false);
  const [animate, setAnimation] = useState(() => false);
  const pageEl = useRef(null);

  useEffect(() => {
    if (!isLoaded && !animate && !isMenuOpen && location.pathname === '/' && !location.hash) {
      setAnimation(true)
    } else if (animate) {
      setTimeout(() => { setAnimation(false) }, 7000)
    }
    if (!isLoaded) setLoaded(true)
    if(isMenuOpen) toggleMenu(false)
  }, [location, animate]);

  return (
    <div
      className={`page__wrapper page__wrapper--${location.pathname.substr(1)}${false ? ' scrollLock' : ''}`}
      ref={ pageEl }>
      <Header
        animateIntro={ animate }
        intro={ data.intro }
        isMenuOpen={ isMenuOpen }
        toggleMenu={ () => toggleMenu(!isMenuOpen) }
      />

      <Navigation
        isOpen={ isMenuOpen }
        navigationLinks={ data.navigationLinks }
        socialLinks={ data.socialLinks }
        email={ data.contact.email.address }
        toggleMenu={ () => toggleMenu(!isMenuOpen) }
      />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/work">
          <Work />
        </Route>
        <Route path="/approach">
          <Approach />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/project/:id">
          <Project/>
        </Route>
      </Switch>

      <Footer
        copyright={ data.copyright }
        socialLinks={ data.socialLinks }
      />

      <Button
        className="scroll-to-top"
        onClick={ () => pageEl.current.scrollIntoView({ behavior: 'smooth' }) }>
        <span className="arrow arrow--big bounce-y t-punch">↑</span>
      </Button>
    </div>
  );
};

export default App;
