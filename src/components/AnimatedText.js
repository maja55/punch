import React from 'react';
import withOnScrollAnimation from './WithOnScrollAnimation';

export const SplitText = ({ content, text, className }) => {
  const words = content || text.split(' ');

  return (
    <div className={ `text--animated ${className}` }>
      { words.map((word, i) => {
        if (word === "\n") return <br key={ i }/>
        return (
          <span className="text-mask" key={ i }>
            <span className="text-content">
              {`${ word } `}
            </span>
          </span>
        )
      }) }
    </div>
  )
}

export default withOnScrollAnimation(SplitText);