import React from 'react';
import Button from './Button';
import './Footer.scss';

const Footer = ({ copyright, socialLinks }) => {
  return (
    <footer className="footer">
      <p className="footer__socialLinks">
        <span className="arrow">→</span>
        { socialLinks.map(({ label, href }) => (
          <Button
            className="footer__socialLink"
            href={ href }
            target="_blank"
            rel="noopener"
            key={ label }
          >
            <span className="arrow bounce-x d-none d-lg-inline-block">→</span>
            { label }
          </Button>
        ))}
      </p>
      <p>{copyright}</p>
    </footer>
  );
};

export default Footer;
