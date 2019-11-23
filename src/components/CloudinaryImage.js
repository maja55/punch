import React from 'react'
import PropTypes from 'prop-types'

const makeUrlParams = props => {
  let { urlParams, quality, fluid, blurUrlParams, useUrlParamsToBlur, blurSize } = props
  const imgFormat = 'f_auto'
  quality = typeof quality === `boolean`
    ? quality
      ? `q_auto` : ''
    : typeof quality === `string` && quality.includes(`q_auto`)
      ? quality
      : `q_auto:${quality}`
  if (!urlParams || !urlParams.length) {
    urlParams = 'c_lfill'
    if (fluid && !fluid.height) urlParams = 'c_scale'
  }
  if (!blurUrlParams || !blurUrlParams.length) {
    blurUrlParams = `c_scale,w_${blurSize}`
  } else {
    blurUrlParams = `${blurUrlParams},c_scale,w_${blurSize}`
  }
  if (useUrlParamsToBlur) {
    blurUrlParams = `${urlParams},w_${blurSize}`
  }
  const toUrl = [imgFormat, quality, urlParams].filter(e => e && e.length)
  const toBlurUrl = [imgFormat, quality, blurUrlParams].filter(e => e && e.length)

  return {
    urlParams: toUrl.join(','),
    blurUrlParams: toBlurUrl.join(',')
  }
}

let io
const listeners = []

function getIO () {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          listeners.forEach(l => {
            let isFistCallbackCalled = false
            if (l[0] === entry.target) {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                if (entry.intersectionRatio > 0.5) {
                  io.unobserve(l[0])
                  if (!isFistCallbackCalled) l[1]()
                  l[2]()
                } else {
                  l[1]()
                  isFistCallbackCalled = true
                }
              }
            }
          })
        })
      },
      { rootMargin: `300px`, threshold: [0, 1] }
    )
  }

  return io
}

const listenToIntersections = (el, cb1, cb2) => {
  getIO().observe(el)
  listeners.push([el, cb1, cb2])
}

const Img = React.forwardRef((props, ref) => {
  const { style, onLoad, alt, ...otherProps } = props

  return (
    <img
      {...otherProps}
      alt={ alt }
      onLoad={onLoad}
      ref={ref}
      style={{
        position: `absolute`,
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
        objectPosition: `center`,
        ...style
      }}
    />
  )
})

Img.propTypes = {
  style: PropTypes.object,
  onError: PropTypes.func,
  onLoad: PropTypes.func
}

class Image extends React.Component {
  constructor (props) {
    super(props)

    // If this browser doesn't support the IntersectionObserver API
    // we default to start downloading the image right away.
    let isLoading = true
    let isVisible = true
    let imgLoaded = true
    let IOSupported = false

    if (
      typeof window !== `undefined` &&
      window.IntersectionObserver
    ) {
      isLoading = false
      isVisible = false
      imgLoaded = false
      IOSupported = true
    }

    // Always don't render image while server rendering
    if (typeof window === `undefined`) {
      isLoading = false
      isVisible = false
      imgLoaded = false
    }


    this.state = {
      isLoading,
      isVisible,
      imgLoaded,
      IOSupported,
    }

    this.imageRef = React.createRef()
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  handleRef (ref) {
    const load = () => this.setState({ isLoading: true })
    const fadeUp = () => { if (this.props.animateOnScroll) this.setState({ isVisible: true }) }

    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, load, fadeUp)
    }
  }

  handleImageLoaded () {
    this.setState({ imgLoaded: true })
    this.props.onLoad && this.props.onLoad()
  }

  createBrakePointsFluid (urlCore) {
    const image = this.props.fluid
    const step = image.step || 150
    const maxBreakpoint = image.maxWidth / image.widthShare
    let size = step
    const results = []
    while (size < maxBreakpoint) {
      const params = `${urlCore},w_${size * image.widthShare}`
      results.push(`https://res.cloudinary.com/${this.props.cloudName}/image/upload/${params}/${this.props.imageName} ${size}w`)
      size = size + step
    }

    results.push(
      `https://res.cloudinary.com/${this.props.cloudName}/image/upload/${urlCore},w_${image.maxWidth}/${this.props.imageName} ${image.maxWidth}w`
    )
    return results.join(',')
  }

  render () {
    const { alt, cloudName, imageName, style, fluid, animateOnScroll } = this.props
    const { imgLoaded, isVisible } = this.state
    const fadeIn = animateOnScroll && imgLoaded && isVisible
    const showPlaceholder = !imgLoaded && !animateOnScroll

    let {urlParams, blurUrlParams} = makeUrlParams(this.props)
    const srcSet = this.createBrakePointsFluid(urlParams)
    urlParams = `${urlParams},w_${fluid.maxWidth}`


    const imagePlaceholderStyle = {
      position: 'relative',
      opacity: showPlaceholder ? 1 : 0,
      transition: 'opacity 0.5s ease-in',
      transitionDelay: showPlaceholder ? `0.5s` : `0.25s`,
    }

    const imageStyle = {
      opacity: (!animateOnScroll && imgLoaded) || fadeIn ? 1 : 0,
      transform: !animateOnScroll || fadeIn ? 'translate3d(0,0,0)' : 'translate3d(0,150px,0)',
      transition: 'opacity .8s ease-in, transform 1.5s cubic-bezier(.05,.17,.23,1) .1s',
    }

    return (
      <div
        ref={this.handleRef}
        style={{
          position: `relative`,
          width: '100%',
          height: '100%',
          ...style
        }}
      >
        {/* Show a blurred version. */}
        <Img
          src={`https://res.cloudinary.com/${cloudName}/image/upload/${blurUrlParams}/${imageName}`}
          alt={ !this.state.isLoading ? alt : '' }
          style={ imagePlaceholderStyle }
        />

        {/* Once the image is visible (or the browser doesn't support IntersectionObserver), start downloading the image */}
        {this.state.isLoading && (
          <Img
            alt={alt}
            src={`https://res.cloudinary.com/${cloudName}/image/upload/${urlParams}/${imageName}`}
            srcSet={srcSet}
            style={imageStyle}
            ref={this.imageRef}
            onLoad={this.handleImageLoaded}
            onError={this.props.onError}
          />
        )}
      </div>
    )
  }
}

Image.defaultProps = {
  cloudName: process.env.NODE_ENV === 'development' ? 'maja55' : 'punch',
  alt: '',
  imgFormat: true,
  quality: true,
  blurSize: 10,
  useUrlParamsToBlur: false,
  animateOnScroll: true
}

Image.propTypes = {
  fluid: PropTypes.shape({
    maxWidth: PropTypes.number.isRequired,
    height: PropTypes.number,
    step: PropTypes.number,
  }),
  urlParams: PropTypes.string,
  alt: PropTypes.string,
  cloudName: PropTypes.string,
  imageName: PropTypes.string.isRequired,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  blurSize: PropTypes.number,
  blurUrlParams: PropTypes.string,
  useUrlParamsToBlur: PropTypes.bool,
  animateOnScroll: PropTypes.bool
}

export default Image