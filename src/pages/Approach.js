import React, { useRef, useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import Image from '../components/Image';
import AnimatedTextBanner from '../components/TextBanner';
import { fetchApi } from '../utils';


const Approach = () => {
  const stepsEl = useRef()
  const [data, setData] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchApi({ url: '/pages?page=approach' })
        setData(data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);

  if (!data) return null;

  console.log(data)

  const { introTextBanner, exitTextBanner, steps } = data;

  return (
    <div className="page approach pt">

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

      <ContactForm full />
    </div>
  );
}

export default Approach;
