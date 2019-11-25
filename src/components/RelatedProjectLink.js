import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import Button from '../components/Button';
import Arrow from '../components/Arrow';

const RelatedProjectLink = ({ isNext, href, id, label, name, relatedimage }) => {
  const AnchorTag = href ? Button : Link;
  const anchorProps = href ? { href, target: '_blank' } : { to: `/projects/${id}` };

  return (
    <AnchorTag { ...anchorProps }>
      <div className={ `related-project related-project--${isNext ? 'next' : 'prev'}` }>
        <div className="related-project__image-wrapper mb-1">
          <Image
            baseClass="related-project"
            image={ relatedimage }
            alt={ name }
          />
        </div>
        <div className="related-project__text t-uppercase">
          <p className="t-sm">{ label }</p>
          <h2 className="t-lg t-punch mb-3">{ name }</h2>
          <Arrow
            className="arrow--big bounce-x"
            isLeft={ !isNext }
            isRight={ isNext } />
        </div>
      </div>
    </AnchorTag>
  );
}

export default RelatedProjectLink;
