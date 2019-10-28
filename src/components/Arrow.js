import React from 'react';
import './Arrow.scss';

const Arrow = ({ className, isRight, isLeft }) => (
  <svg
    className={ `arrow ${className} ${isRight || isLeft ? 'arrow--h' : 'arrow--v'}` }
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox={ isLeft || isRight ? "0 0 219.01 167.3" : "0 0 167.3 219" }
    xmlSpace="preserve"
  >
    <polygon
      points={
        isLeft ? "84.1 0 0 83.2 83.3 167.3 88.22 162.42 13.38 86.76 218.98 87.75 219.01 80.75 13.42 79.76 88.98 4.92 84.1 0" :
        isRight ? "134.91 167.3 219.01 84.1 135.72 0 130.79 4.88 205.63 80.54 0.03 79.55 0 86.55 205.6 87.54 130.04 162.38 134.91 167.3" :
        "167.3,83.7 83.7,0 0,83.7 4.9,88.6 80.2,13.4 80.2,219 87.2,219 87.2,13.4 162.4,88.6"
      }
    />
  </svg>
);

export default Arrow;
