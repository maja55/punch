import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import RoloBanner from '../components/RoloBanner';
import ContactForm from '../components/ContactForm';
import ProjectsList from '../components/ProjectsList';
import Logo from '../components/Logo';
import Image, { LazyImage } from '../components/Image';


const Home = ({ data }) => {
  const projectsEl = useRef()
  if (!data) return null;
  const { projects, news, video, introTextBanner, textBanner, extraTextBanner, exitTextBanner, roloBanner } = data

  return (
    <React.Fragment>
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
          <div className="t-sm">{ introTextBanner.intro }</div>
          <div className="t-lg t-punch t-uppercase">{ introTextBanner.punchline }</div>
        </section>

        <section className="home__links mx mb-0 mb-4">
          <div className="home__link">
            <Link to={ extraTextBanner.link }>
              <div className="t-sm t-light">{ extraTextBanner.intro }</div>
              <div className="t-uppercase t-lg t-punch t-uppercase">
                { extraTextBanner.punchline }
                <span className="arrow bounce-x">→</span>
              </div>
            </Link>
          </div>

          <Button
            className="home__link"
            onClick={(e) => {
              e.preventDefault();
              projectsEl.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="t-sm t-light">{ textBanner.intro }</div>
            <div className="t-uppercase t-lg t-punch t-uppercase">
              { textBanner.punchline } 
              <span className="arrow bounce-y">↓</span>
            </div>
          </Button>
        </section>

        {/* <LazyImage widthShare={ 0.5 } /> */}

        <div ref={ projectsEl }>
          <ProjectsList projects={ projects } />
        </div>

        <RoloBanner { ...roloBanner } />

        <section className="home__news mx">
          <div className="home__newslist">
            { news.slice(0,3).map(({ id, thumbnail, title }) => (
              <Link key={ id } to={ `news/${id}` }>
                <div className="news-link">
                  <Image image={ { src: thumbnail.url} } classAddition="mb-2" alt={ title } />
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
          <Link to={ exitTextBanner.link }>
            <div className="t-sm t-light">{ exitTextBanner.intro }</div>
            <div className="t-uppercase t-lg t-punch t-uppercase">
              { exitTextBanner.punchline }
              <span className="arrow bounce-x">→</span>
            </div>
          </Link>
        </section>

        <ContactForm full />
      </div>
    </React.Fragment>
  );
}

export default Home;
