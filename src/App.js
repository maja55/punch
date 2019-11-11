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
import Arrow from './components/Arrow';

import data from './data.json'


const App = () => {
  let location = useLocation();
  const [isMenuOpen, openMenu] = useState(() => false);
  const [isLoaded, setLoaded] = useState(() => false);
  const [animate, setAnimation] = useState(() => false);
  const [animating, startAnimation] = useState(() => false);
  const [scrollTop, setScrollTop] = useState(() => 0);
  const isAnimating = useRef(false);
  const shouldAnimate = useRef(false);
  const pageEl = useRef(null);

  const toggleMenu = (open) => {
    if (open) {
      const offset = window.scrollY;
      setScrollTop(window.scrollY)
      document.body.style.marginTop = `${offset}px`;
      document.body.classList.add('scrollLock');
    } else {
      document.body.style.marginTop = 0;
      document.body.classList.remove('scrollLock');

      if (scrollTop) {
        window.scroll(0, scrollTop);
        setScrollTop(0)
      }
    }

    openMenu(open)
  }

  const handleScroll = () => {
    document.body.classList.add('scrollLock');
    startAnimation(true)
    isAnimating.current = true;

    setTimeout(() => { 
      setAnimation(false)
      shouldAnimate.current = false;
      document.body.classList.remove('scrollLock');
    }, 1000)

    window.removeEventListener('scroll', handleScroll);
  }

  useEffect(() => {
    if (!isLoaded && !animate && !isMenuOpen && location.pathname === '/' && !location.hash) {
      setAnimation(true)
      shouldAnimate.current = true;
      window.addEventListener('scroll', handleScroll);

      // animate after 4 sec if user didn't trigger animation by scrolling
      setTimeout(() => {
        if (shouldAnimate.current && !isAnimating.current) handleScroll()
      }, 3500)
    }
    if (!isLoaded) setLoaded(true)
    if(isMenuOpen) toggleMenu(false)
  }, [location, animate]);

  return (
    <div
      className={`page__wrapper page__wrapper--${location.pathname.substr(1)}`}
      ref={ pageEl }>
      { isLoaded &&
        <Header
          animateIntro={ animate }
          shouldAnimate={ animating }
          intro={ data.punchline }
          isMenuOpen={ isMenuOpen }
          toggleMenu={ () => toggleMenu(!isMenuOpen) }
        />
      }

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
        <Route path="/news/">
          <div/>
        </Route>
        <Route path="/news/:id">
          <div/>
        </Route>
        <Route path="/services">
          <div/>
        </Route>
      </Switch>

      <Footer
        copyright={ data.copyright }
        socialLinks={ data.socialLinks }
      />

      <Button
        className="scroll-to-top"
        onClick={ () => pageEl.current.scrollIntoView({ behavior: 'smooth' }) }>
        <Arrow className="arrow--big bounce-y" />
      </Button>
    </div>
  );
};

export default App;
