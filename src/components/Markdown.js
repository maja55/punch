import React from 'react';
import marked from 'marked';

const Markdown = ({ markdown }) => {
  const rawMarkup = marked(markdown, { sanitize: true });
  
  return <div dangerouslySetInnerHTML={{ __html: rawMarkup }} />
};

export default Markdown;
