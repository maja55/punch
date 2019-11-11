import React from 'react'
import PropTypes from 'prop-types'

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

export default Image;
