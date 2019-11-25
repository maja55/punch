import React, { useRef } from 'react';
import Image from '../components/Image';
import AnimatedTextBanner from '../components/TextBanner';


const Contact = ({ data }) => {
  const contactForm = useRef();
  if (!data) return null;
  const { introTextBanner, heroimage } = data;

  return (
    <React.Fragment>
      <AnimatedTextBanner
        className="contact__intro mx"
        titleClass="t-md mb-1"
        title={ introTextBanner.intro }
        punchline={ introTextBanner.punchline }
        onClick={() => contactForm.current.scrollIntoView({ behavior: 'smooth' })}
        arrowClass="d-none d-lg-inline-block"
        isDown
      />
      <Image
        baseClass="contact"
        image={ { src: heroimage[0].url } }
        alt="contact"
        classAddition="w-100"
      />
      <section className="pt mb-0" ref={ contactForm } />
    </React.Fragment>
  );
}

export default Contact;
