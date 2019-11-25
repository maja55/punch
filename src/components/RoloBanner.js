import React from 'react';
import { Link } from "react-router-dom";

const RoloBanner = ({ label="Our approach →", href="/approach" }) => (
  <section className="rolo-banner">
    <Link to={ href }>
      { [...Array(6).keys()].map((key) => (
        <span key={key} className="rolo-banner__label t-uppercase t-lg t-punch">
          {label}
        </span>
      ))}
    </Link>
  </section>
);

export default RoloBanner;
