import React from 'react';
import { Link } from "react-router-dom";
import Button from './Button'
import Logo from './Logo'

const Header = ({ toggleMenu, isMenuOpen, animateIntro, intro, shouldAnimate }) => (
  <header className={ `header${animateIntro ? ' will-animate' : ''}${shouldAnimate ? ' animated' : ''}` }>
    <p className="logo__intro t-md t-punch">
      { intro }
    </p>
    <Link to="/" onClick={isMenuOpen ? toggleMenu : undefined}>
      <Logo />
    </Link>
    <Button
      className={`menu-toggle${isMenuOpen ? ' open' : ''}`}
      onClick={ toggleMenu }>
    </Button>
  </header>
);

export default Header;
