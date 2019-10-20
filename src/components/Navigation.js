import React from 'react';
import { Link } from "react-router-dom";
import Button from './Button'
import './Navigation.scss'

const Navigation = ({ email, isOpen, navigationLinks, socialLinks, toggleMenu }) => (
  <aside className={ `menu bg-dark${isOpen ? ' open' : ''}`}>
    <nav className="menu__wrapper">

      <ul className="menu__navLinks t-punch t-lg t-uppercase">
        { navigationLinks.map(({ label, href, symbol }) => (
          <li className="menu__navLink" key={ label }>
            <span className="menu__navLinkSymbol">
              {symbol}
            </span>
            <Link to={ href } onClick={ toggleMenu }>{ label }</Link>
          </li>
        ))}
      </ul>

      <ul className="menu__socialLinks t-sm">
        <Button
          className="menu__socialLink"
          href={ `mailto:${email}` }
        >
          { email }
        </Button>
        { socialLinks.map(({ label, href }) => (
          <Button
            className="menu__socialLink"
            href={ href }
            target="_blank"
            rel="noopener"
            key={ label }
          >
            { label }
            <span className="arrow bounce-x d-none d-lg-inline-block">→</span>
          </Button>
        ))}
      </ul>

    </nav>
  </aside>
);

export default Navigation;
