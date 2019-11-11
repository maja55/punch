import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Image from '../components/Image';
import Button from '../components/Button';
import RoloBanner from '../components/RoloBanner';
import RelatedProjectLink from '../components/RelatedProjectLink';
import AnalyticsArticle from '../components/AnalyticsArticle';
import DesignArticle from '../components/DesignArticle';

import data from '../data.json'

const Project = () => {
  let { id } = useParams();
  const articlesEl = useRef()
  // TODO: make a request to retrive project data by id
  const { articles, analyticsLayout, heroimage, intro, name, tags } = data.projects[id - 1];
  const projectsCount = data.projects.length
  const previousProject = data.projects[id - 2] || data.projects[projectsCount - 1];
  const nextProject = data.projects[id] || data.projects[0];
  const { exitBanner } = data.work;
  const Article = analyticsLayout ? AnalyticsArticle : DesignArticle;

  return (
    <div className="page project pt">

      <section className="project__intro mb-0">
        { intro &&
          <p data-html="true" className="project__intro-top t-sm mx">{ intro }</p>
        }
        <div className="project__intro-bottom mx">
          <Button
            className="project__title"
            onClick={() => articlesEl.current && articlesEl.current.scrollIntoView({ behavior: 'smooth' })}>
            <h1 className="t-lg t-uppercase">
              { name }
              <span className="arrow bounce-y">↓</span>
            </h1>
          </Button>
          <ul className="project__tags d-none d-sm-inline-block">
            { !analyticsLayout && tags.map(tag => (
              <li key={ tag } className="project__tag t-sm t-uppercase">
                { tag }
              </li>
            ))}
          </ul>
        </div>
        { heroimage && 
          <Image
            baseClass="project"
            classAddition="w-100"
            image={ heroimage }
            alt={ name }
          />
        }
      </section>

      { articles &&
        <section className="project__articles pt" ref={ articlesEl }>
          { articles.map((article, i) => article && <Article key={ i } index={ i } { ...article } />) }
        </section>
      }

      <section className="project__exit mx">
        <RelatedProjectLink
          label="Previous case"
          { ...previousProject }
        />
        <RelatedProjectLink
          label="Next case"
          isNext
          { ...nextProject }
        />
      </section>

      <RoloBanner { ...exitBanner } />

      <ContactForm />
    </div>
  );
}

export default Project;
