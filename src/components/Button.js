import React from 'react';

const Button = ({ children, ...props }) => {
  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag { ...props }>
      { children }
    </Tag>
  );
};

export default Button;
