import React, { useRef } from 'react';
import ContactForm from '../components/ContactForm';
import Image from '../components/Image';
import Button from '../components/Button';
import AnimatedTextBanner from '../components/TextBanner';
import './Contact.scss';

import data from '../data.json'

const Contact = () => {
  const contactForm = useRef()
  const { intro, punchline, image } = data.contact;

  return (
    <div className="page contact pt">
      <AnimatedTextBanner
        className="contact__intro mx"
        titleClass="t-md mb-1"
        title={ intro }
        punchline={ punchline }
        onClick={() => contactForm.current.scrollIntoView({ behavior: 'smooth' })}
        arrowClass="d-none d-lg-inline-block"
        isDown
      />
      {/* <section className="contact__intro mx">
        <p className="t-md mb-1">{ intro }</p>
        <Button onClick={() => contactForm.current.scrollIntoView({ behavior: 'smooth' })}>
          <h1 className="t-lg t-uppercase t-punch">
            { punchline }
            <span className="arrow bounce-y d-none d-lg-inline-block">↓</span>
          </h1>
        </Button>
      </section> */}
      <section>
        <Image
          baseClass="contact"
          src={ image.src }
          alt="contact"
          classAddition="w-100"
        />
      </section>
      <div ref={ contactForm }>
        <ContactForm full />
      </div>
    </div>
  );
}

export default Contact;
