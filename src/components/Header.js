import React from 'react';
import { Link } from "react-router-dom";
import Button from './Button'
import './Header.scss';

const Header = ({ toggleMenu, isMenuOpen, animateIntro, intro }) => (
  <header className={ `header${animateIntro ? ' animated' : ''}` }>
    <p className="logo__intro t-md t-punch">
      { intro }
    </p>
    <div className="logo t-punch">
      <Link to="/" onClick={isMenuOpen ? toggleMenu : undefined}>
        PUNCH
      </Link>
    </div>
    <Button
      className={`menu-toggle${isMenuOpen ? ' open' : ''}`}
      onClick={ toggleMenu }>
    </Button>
  </header>
);

export default Header;
