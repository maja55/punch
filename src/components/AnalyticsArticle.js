import React from 'react';
import Markdown from './Markdown';
import './AnalyticsArticle.scss';

const AnalyticsArticle = ({ title, graphMd, graphSvg, textMd, textSvg, index }) => {
  return (
    <div className="article article--analytics mx">
      { title && <h2 className="article__title t-uppercase t-lg mb-3">{ title }</h2> }
      <div className={`article__columns${index % 2 ? ' reverse' : ''}` }>
          <div className="article__column">
            { graphMd && <Markdown markdown={ graphMd } /> }
            { graphSvg && <div dangerouslySetInnerHTML={{ __html: graphSvg }} />}
          </div>
          <div className="article__column">
            { textMd && <Markdown markdown={ textMd } /> }
            { textSvg && <div dangerouslySetInnerHTML={{ __html: textSvg }} />}
          </div>
      </div>
    </div>
  );
}

export default AnalyticsArticle;
