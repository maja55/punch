import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import RoloBanner from '../components/RoloBanner';
import ContactForm from '../components/ContactForm';
import ProjectsList from '../components/ProjectsList';
import Logo from '../components/Logo';
import Image from '../components/Image';
import './Home.scss'

import data from '../data.json'

const getArrowAxis = (arrow) => arrow === "↑" || arrow === "↓" ? "y" : 'x';

const Home = () => {
  const projectsEl = useRef()
  const { projects, news, home: { video, intro, links, projectIds, exitBanner } } = data;

  return (
    <div className="page home">

      <section className="home__video">
        <video
          src={ video.url }
          poster={ video.posterUrl }
          muted
          playsInline
          autoPlay
          loop
        />
      </section>

      <div className="home__body">
        <div className="header-bg">
          <Logo />
        </div>

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

        <section className="home__news mx">
          <div className="home__newslist">
            { news.slice(0,3).map(({ id, image, title }) => (
              <Link key={ id } to={ `news/${id}` }>
                <div className="news-link">
                  <Image src={ image.src } classAddition="mb-2" alt={ title } />
                  <div className="t-md news-link__text">
                    <span className="d-lg-none">{ title }&nbsp;→</span>
                    <span className="d-none d-lg-inline-block">
                      { title }
                      <span className="arrow bounce-x">&nbsp;→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )) }
          </div>
          <Link to='/news'>
            <div className="t-md t-light">Keep up with us</div>
            <div className="t-uppercase t-lg t-punch t-uppercase">
              More news
              <span className="arrow bounce-x">→</span>
            </div>
          </Link>
        </section>

        <ContactForm full />
      </div>

    </div>
  );
}

export default Home;
