import React from 'react';
import Markdown from './Markdown';
import './AnalyticsArticle.scss';

const AnalyticsArticle = ({ title, columns, index }) => {
  return (
    <div className="article article--analytics mx">
      { title && <h2 className="article__title t-uppercase t-lg mb-3">{ title }</h2> }
      <div className={`article__columns${index % 2 ? ' reverse' : ''}` }>
        { columns && columns.length && columns.map(({ markdown, svg }, i) => (
          <div className="article__column" key={ i }>
            { markdown && <Markdown markdown={ markdown } /> }
            { svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
          </div>
        )) }
      </div>
    </div>
  );
}

export default AnalyticsArticle;
