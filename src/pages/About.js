import React from 'react';
import ContactForm from '../components/ContactForm';
import RoloBanner from '../components/RoloBanner';
import Image from '../components/Image';
import './About.scss';

import data from '../data.json'

const About = () => {
  const { punchlines, title, text, image, topics, topicsTitle, exitBanner } = data.about;

  return (
    <div className="page about pt">
      <section className="about__punchlines mx">
        <ul className="t-lg t-uppercase t-punch">
          { punchlines.map(line => <li key={ line }>{ line }</li>) }
        </ul>
      </section>

      <section>
        <Image baseClass="about-intro" src={ image.src } alt="contact" />
      </section>

      <section className="about__intro mx">
        <h2 className="t-md t-uppercase mb-2">{ title }</h2>
        <p className="t-sm">{ text }</p>
      </section>

      <section className="about__image mx">
        <Image src={ image.src } alt="contact" />
      </section>

      <section className="about__topics mx">
        <h2 className="t-md t-uppercase mb-3">{ topicsTitle }</h2>
        <div className="topics t-sm">
          { topics.map(({ heading, items }) => (
            <div key={ heading } className="topics__section mb-3">
              <header className="t-punch">{ heading }</header>
              { items.map((item) => <p key={ item }>{ item }</p>) }
            </div>
          )) }
        </div>
      </section>

      <RoloBanner { ...exitBanner } />

      <ContactForm />
    </div>
  );
}

export default About;
