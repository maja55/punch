import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
import Button from '../components/Button';
import './RelatedProjectLink.scss';

const RelatedProjectLink = ({ arrow, classModifier, href, id, label, name, thumbnail }) => {
  const AnchorTag = href ? Button : Link;
  const anchorProps = href ? { href, target: '_blank' } : { to: `/project/${id}` };

  return (
    <AnchorTag { ...anchorProps }>
      <div className={ `related-project related-project--${classModifier}` }>
        <Image
          baseClass="related-project"
          classAddition="mb-1"
          src={ thumbnail.src }
          alt={ name }
        />
        <div className="related-project__text t-uppercase">
          <p className="t-sm">{ label }</p>
          <h2 className="t-lg t-punch">{ name }</h2>
          { arrow && <span className="arrow arrow--big bounce-x t-punch">{ arrow }</span> }
        </div>
      </div>
    </AnchorTag>
  );
}

export default RelatedProjectLink;
