import React, { useRef } from 'react';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';
import Image from '../components/Image';
import './Approach.scss';

import data from '../data.json'

const Approach = () => {
  const stepsEl = useRef()
  const { buttonLabel, exitline, intro, punchlines, steps } = data.approach;

  return (
    <div className="page approach pt">
      <section className="approach__punchlines mx">
        <ul className="t-lg t-uppercase t-punch">
          { punchlines.map(line => <li key={ line }>{ line }</li>) }
        </ul>
      </section>

      <section className="approach__intro mx">
        <p>{ intro }</p>
        <Button
          className="approach__title"
          onClick={() => stepsEl.current.scrollIntoView({ behavior: 'smooth' })}>
          <h1 className="t-lg t-punch t-uppercase">
            { buttonLabel }
            <span className="arrow bounce-y">↓</span>
          </h1>
        </Button>
      </section>

      <section ref={ stepsEl } className="approach__steps">
        { steps.map(({ name, title, description, image }, i) => (
          <div key={ name } className="approach__step">
            <div className="step__text">
              <div className="step__text-top t-md">
                <div>{ `Step ${i + 1}` }</div>
                <div className="t-uppercase">{ name }</div>
              </div>
              <div className="step__text-middle t-lg t-punch t-uppercase">
                { title }
              </div>
              <div className="step__text-bottom">
                { description }
              </div>
            </div>
            <Image
              src={ image.src }
              alt={ name }
              baseClass="step"
            />
          </div>
        ))}
      </section>

      <section className="approach__exit t-lg t-uppercase t-punch mx">
        { exitline }
      </section>

      <ContactForm full />
    </div>
  );
}

export default Approach;
