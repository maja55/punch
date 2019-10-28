import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const useIntersectionObserver = ({ root, targetRef, onIntersect, observeOnce = true, threshold, rootMargin }) => {
  useEffect(() => {
      if (!(targetRef && targetRef.current && onIntersect)) return undefined;

      const options = {
          root: root && root.current,
          rootMargin,
          threshold,
      };
      const node = targetRef.current;
      const callback = (entries, observer) => {
          entries
              .filter(({ target }) => target === node)
              .forEach(({ isIntersecting }) => {
                  if (!isIntersecting) return null;
                  if (observeOnce) observer.unobserve(node);
                  return onIntersect(node);
              });
      };
      const observer = new IntersectionObserver(callback, options);

      observer.observe(node);

      // clean up on unmount
      return () => observer.unobserve(node);
  });
};

const withOnScrollAnimation = (Component) => {
    const WithOnScrollClass = ({ baseClass, revealClass, rootMargin, style, threshold, ...props }) => {
        const targetRef = useRef(null);
        const [visible, setVisibility] = useState(false);

        useIntersectionObserver({
            onIntersect: () => setVisibility(true),
            rootMargin,
            targetRef,
            threshold,
        });

        return (
            <div
              ref={ targetRef }
              className={ `${baseClass} ${visible ? revealClass : ''}` }
              style={ style }
            >
                <Component { ...props } />
            </div>
        );
    };

    WithOnScrollClass.displayName = `${Component.displayName || Component.name}WithOnScrollAnimation`;

    WithOnScrollClass.propTypes = {
        revealClass: PropTypes.string,
        baseClass: PropTypes.string,
        rootMargin: PropTypes.string,
        threshold: PropTypes.number,
        callback: PropTypes.func,
    };

    WithOnScrollClass.defaultProps = {
        revealClass: 'revealed',
        baseClass: 'reveal',
        rootMargin: '10px',
        threshold: 0,
        callback: null,
    };

    return WithOnScrollClass;
};

export default withOnScrollAnimation;