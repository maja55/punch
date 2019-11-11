import React from 'react';
import { Link } from "react-router-dom";
import Button from './Button'

const Navigation = ({ email, isOpen, navigationLinks, socialLinks, toggleMenu }) => (
  <aside className={ `menu bg-dark${isOpen ? ' open revealed' : ''}`}>
    <nav className="menu__wrapper">

      <ul className="menu__navLinks text--animated t-punch t-lg t-uppercase">
        { navigationLinks.map(({ label, href, symbol }, i) => (
          <li key={ label } className="text-mask inline-img__wrapper menu__navLink">
            <span className="text-content" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="menu__navLinkSymbol inline-img">
                <img src={ symbol } alt="☺" />
              </span>
              <Link to={ href } onClick={ toggleMenu }>{ label }</Link>
            </span>
          </li>
        )) }
      </ul>

      <ul className="menu__socialLinks text--animated t-sm mx">
        <Button
          className="menu__socialLink text-mask d-table"
          href={ `mailto:${email}` }
        >
          <span className="text-content" style={{ transitionDelay: '0.5s' }}>
            { email }
          </span>
        </Button>
        { socialLinks.map(({ label, href }, i) => (
          <Button
            className="menu__socialLink text-mask d-table"
            href={ href }
            target="_blank"
            rel="noopener"
            key={ label }
          >
            <span className="text-content" style={{ transitionDelay: `${(i + 1) * 0.1 + 0.5}s` }}>
              { label }
              <span className="arrow bounce-x d-none d-lg-inline-block">→</span>
            </span>
          </Button>
        ))}
      </ul>

    </nav>
  </aside>
);

export default Navigation;
