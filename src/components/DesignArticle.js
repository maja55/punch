import React from 'react';
import Image from './Image';
import './DesignArticle.scss'

const DesignArticle = ({ text, image, secImage, isFlipped }) => {
  return (
    <div className={ `article article--design${!secImage && isFlipped ? ' reverse' : ''}` }>
      { text && !secImage &&
        <div className="article__text mx">
          { text.title && <h2 className="t-uppercase t-md mb-3">{ text.title }</h2> }
          { text.description && <p className="mb-4">{ text.description }</p> }
        </div>
      }
      { image &&
        <div
          className={ `article__image ${image.overflow ? 'overflow' : 'no-overflow'}${secImage ? ' article__image--first' : ''}` }
          style={ { width: `${image.width}%`} }>
          <Image classAddition="w-100" src={ image.src } />
        </div>
      }
      { secImage &&
        <div
          className={ `article__image ${secImage.overflow ? 'overflow' : 'no-overflow'}${secImage ? ' article__image--second' : ''}` }
          style={ { width: `${secImage.width}%`} }>
          <Image classAddition="w-100" src={ secImage.src } />
        </div>
      }
    </div>
  );
}

export default DesignArticle;
