import React, { useRef } from 'react';
import Button from '../components/Button';
import RoloBanner from '../components/RoloBanner';
import ContactForm from '../components/ContactForm';
import ProjectsList from '../components/ProjectsList';
import './Home.scss'

import data from '../data.json'

const getArrowAxis = (arrow) => arrow === "↑" || arrow === "↓" ? "y" : 'x';

const Home = () => {
  const projectsEl = useRef()
  const { projects, home: { video, intro, links, projectIds, exitBanner } } = data;

  return (
    <div className="page home">

      <section className="home__video">
        <video
          src={ video.videoUrl }
          poster={ video.videoPosterUrl }
          muted
          playsInline
          autoPlay
          loop
        />
      </section>

      <div className="home__body">
        <section className="home__intro">
          <div className="t-md">{ intro.heading }</div>
          <div className="t-lg t-punch t-uppercase">{ intro.punchline }</div>
        </section>

        <section className="home__links">
          { links.map(({ heading, label, arrow, href }) => (
            <Button
              key={ label }
              className="home__link"
              href={ href }
              onClick={ (e) => {
                if (label.toLowerCase() === 'projects') {
                  e.preventDefault();
                  projectsEl.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="t-md t-light">{ heading }</div>
              <div className="t-uppercase t-lg t-punch t-uppercase">
                { label } 
                { arrow &&
                  <span className={ `arrow bounce-${getArrowAxis(arrow)}` }>
                    { arrow }
                  </span>
                }
              </div>
            </Button>
          ))}
        </section>

        <div ref={ projectsEl }>
          <ProjectsList projectIds={ projectIds } projects={ projects } />
        </div>

        <RoloBanner { ...exitBanner } />

        <ContactForm full />
      </div>

    </div>
  );
}

export default Home;
