import React from 'react';
import './Button.scss';

const Button = ({ children, ...props }) => {
  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag { ...props }>
      { children }
    </Tag>
  );
};

export default Button;
