import React, { useRef } from 'react';
import Image from '../components/Image';
import AnimatedTextBanner from '../components/TextBanner';


const Approach = ({ data }) => {
  const stepsEl = useRef()
  if (!data) return null;
  const { introTextBanner, exitTextBanner, steps } = data;

  return (
    <React.Fragment>
      <AnimatedTextBanner
        { ...introTextBanner }
        isDown
        className="approach__intro mx mb-0"
        titleClass="t-uppercase"
        onClick={ () => stepsEl.current.scrollIntoView({ behavior: 'smooth' })}
      />
      <section ref={ stepsEl } className="approach__steps pt">
        { steps && steps.map(({ title, description, image }, i) => (
          <section key={ title } className="approach__step">
            <div className="step__text mx">
              <div className="step__text-top inline-img__wrapper t-lg t-punch t-uppercase mb-3">
                Step
                <div className="inline-img h-100">
                  <img src={ `/assets/svgs/step${i + 1}.svg` } alt={ i + 1 } />
                </div>
              </div>
              <div className="step__text-middle">
                <h2 className="t-md">{ title }</h2>
                <p className="mb-3">{ description }</p>
              </div>
            </div>
            <Image
              image={ { src: image.url } }
              alt={ title }
              baseClass="step"
              classAddition="mx"
            />
          </section>
        ))}
      </section>
      <p className="approach__exit-desc t-md mx mb-4">{ exitTextBanner.intro }</p>
      <AnimatedTextBanner
        { ...exitTextBanner }
        titleClass="t-uppercase"
        className="approach__exit mx"
      />
    </React.Fragment>
  );
}

export default Approach;
