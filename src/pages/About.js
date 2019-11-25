import React from 'react';
import RoloBanner from '../components/RoloBanner';
import Image from '../components/Image';


const About = ({ data }) => {
  if (!data) return null;
  const { introTextBanner, textBanner, roloBanner, heroimage, video } = data;

  return (
    <React.Fragment>
      <section className="about__punchlines mx t-lg t-uppercase t-punch">
        { introTextBanner.punchline.split('\\n').map(line => <div>{ line }</div>) }
      </section>

      <section>
        <Image baseClass="about-intro" image={ { src: heroimage[0].url } } alt="about punch" />
      </section>

      <section className="about__intro mx">
        <h2 className="t-md t-uppercase mb-2">{ textBanner.intro }</h2>
        <p className="t-sm">{ textBanner.description }</p>
      </section>

      { heroimage[1] &&
        <section className="about__image mx">
          <Image image={ { src: heroimage[1].url } } alt={ heroimage[1].name } />
        </section>
      }
      
      { video &&
        <section className="mx">
          <video
            className="about__video"
            src={ video.url }
            poster={ video.posterUrl }
            muted
            playsInline
            autoPlay
            loop
          />
        </section>
      }

      {/* <section className="about__topics mx">
        <h2 className="t-md t-uppercase mb-3">{ topicsTitle }</h2>
        <div className="topics t-sm">
          { topics.map(({ heading, items }) => (
            <div key={ heading } className="topics__section mb-3">
              <header className="t-punch">{ heading }</header>
              { items.map((item) => <p key={ item }>{ item }</p>) }
            </div>
          )) }
        </div>
      </section> */}

      <RoloBanner { ...roloBanner } />
    </React.Fragment>
  );
}

export default About;
