import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import Button from '../components/Button';
import Arrow from '../components/Arrow';
import './RelatedProjectLink.scss';

const RelatedProjectLink = ({ isNext, href, id, label, name, thumbnail }) => {
  const AnchorTag = href ? Button : Link;
  const anchorProps = href ? { href, target: '_blank' } : { to: `/project/${id}` };

  return (
    <AnchorTag { ...anchorProps }>
      <div className={ `related-project related-project--${isNext ? 'next' : 'prev'}` }>
        <Image
          baseClass="related-project"
          classAddition="mb-1"
          src={ thumbnail.src }
          alt={ name }
        />
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
