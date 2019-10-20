import React from 'react'
import PropTypes from 'prop-types'
import './Image.scss'

const Image = ({ baseClass, classAddition, image={}, src, alt }) => (
  <img
    className={ `${baseClass}__image ${classAddition}` }
    srcSet={ `
      ${image.imageS || src} 768w,
      ${image.imageM || src} 1200w,
      ${image.imageL || src} 1440w,
    ` }
    sizes="(max-width: 768px) 700px,
      (max-width: 1200px) 1000px,
      1440px"
    src={ src }
    alt={ alt }
  />
)

Image.defaultProps = {
  image: {},
  alt: '',
  baseClass: '',
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  image: PropTypes.shape({}),
  alt: PropTypes.string,
  baseClass: PropTypes.string,
}

export default Image;
