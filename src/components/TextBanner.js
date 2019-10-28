import React from 'react';
import { SplitText } from '../components/AnimatedText';
import withOnScrollAnimation from '../components/WithOnScrollAnimation';
import Button from '../components/Button';

export const TextBanner = ({ className, title, titleClass, punchline, punchlineClass, onClick, href, isDown, arrowClass }) => (
  <section className={ className }>
    <div className="t-lg">
      <SplitText text={ title } className={ titleClass } />
      <Button
        className="t-punch t-uppercase delay"
        onClick={ onClick }
        href={ href }>
        <SplitText text={ punchline } className={ `d-inline-block ${punchlineClass}` } />
        <span className={ `arrow bounce-${isDown ? 'y' : 'x'}` }>
          <SplitText
            text={ isDown ? '↓' : '->' }
            className={ arrowClass ? arrowClass : 'd-inline-block' }
          />
        </span>
      </Button>
    </div>
  </section>
);

const AnimatedTextBanner = withOnScrollAnimation(TextBanner);

export default AnimatedTextBanner;
