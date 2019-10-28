import React from 'react';
import withOnScrollAnimation from './WithOnScrollAnimation';
import './AnimatedText.scss'

export const SplitText = ({ content, text, className }) => {
  const words = content || text.split(' ');

  return (
    <div className={ `text--animated ${className}` }>
      { words.map(word => {
        if (word === "\n") return <br/>
        return (
          <span className="text-mask">
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