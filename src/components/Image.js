import React from 'react'
import PropTypes from 'prop-types'
import CloudinaryImage from './CloudinaryImage'

const Image = ({ baseClass, classAddition, image={}, alt }) => (
  <img
    className={ `${baseClass}__image ${classAddition}` }
    srcSet={ `
      ${image.imageS || image.src } 768w,
      ${image.imageM || image.src } 1200w,
      ${image.imageL || image.src } 1440w,
    ` }
    sizes="(max-width: 768px) 700px,
      (max-width: 1200px) 1200px,
      1440px"
    src={ image.src }
    alt={ alt }
  />
)

Image.defaultProps = {
  alt: 'punch',
  baseClass: '',
}

Image.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  alt: PropTypes.string,
  baseClass: PropTypes.string,
}


export const LazyImage = ({ alt, baseClass, classAddition, widthShare=1, step=350, image='pdi5rye4psrysfqdhzng' }) => {
  const onLoad = () => console.log('loaded')
  return(
    <div className={ `${baseClass}__image ${classAddition}` } id="image">
      <CloudinaryImage
        alt={ alt }
        imageName={ image }
        fluid={{ maxWidth: 3500 * widthShare, step, widthShare }}
        quality="good"
        style={{ width: `${widthShare * 100}vw` }}
        onLoad={ onLoad }
      />
    </div>
  )
}

export default Image;
