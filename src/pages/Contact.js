import React, { useRef } from 'react';
import ContactForm from '../components/ContactForm';
import Image from '../components/Image';
import AnimatedTextBanner from '../components/TextBanner';

import data from '../data.json'

const Contact = () => {
  const contactForm = useRef()
  const { intro, punchline, heroimage } = data.contact;

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
      <Image
        baseClass="contact"
        image={ heroimage }
        alt="contact"
        classAddition="w-100"
      />
      <section className="mb-0 pt" ref={ contactForm }>
        <ContactForm full />
      </section>
    </div>
  );
}

export default Contact;
