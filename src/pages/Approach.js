import React, { useRef } from 'react';
import ContactForm from '../components/ContactForm';
import Image from '../components/Image';
import AnimatedTextBanner from '../components/TextBanner';
import './Approach.scss';

import data from '../data.json'


const Approach = () => {
  const stepsEl = useRef()
  const { intro, exit, steps } = data.approach;

  return (
    <div className="page approach pt">

      <AnimatedTextBanner
        { ...intro }
        isDown
        className="approach__intro mx"
        titleClass="t-uppercase"
        onClick={ () => stepsEl.current.scrollIntoView({ behavior: 'smooth' })}
      />

      <section ref={ stepsEl } className="approach__steps">
        { steps.map(({ number, title, description, graphic }) => (
          <section key={ title } className="approach__step">
            <div className="step__text mx">
              <div className="step__text-top inline-img__wrapper t-lg t-punch t-uppercase mb-3">
                Step
                <div className="inline-img h-100">
                  <img src={ number } alt={ title } />
                </div>
              </div>
              <div className="step__text-middle">
                <h2 className="t-md">{ title }</h2>
                <p className="mb-3">{ description }</p>
              </div>
            </div>
            <Image
              src={ graphic }
              alt={ title }
              baseClass="step"
              classAddition="mx"
            />
          </section>
        ))}
      </section>

      <p className="approach__exit-desc t-md mx mb-4">{ exit.description }</p>
      <AnimatedTextBanner
        { ...exit }
        titleClass="t-uppercase"
        className="approach__exit mx"
      />

      <ContactForm full />
    </div>
  );
}

export default Approach;
