import React, { useState } from 'react';
import ProjectsList from '../components/ProjectsList';
import RoloBanner from '../components/RoloBanner';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';
import './Work.scss';

import data from '../data.json'

const Work = () => {
  const { projects, projectFilters, work: { title, exitBanner } } = data;
  const [activeFilter, setFilter] = useState();

  return (
    <div className="page work pt">
      <section className="work__intro mx">
        <Button
          className="work__title"
          onClick={ () => setFilter() }>
          <h1 className="t-lg t-punch t-uppercase">
            { title }
            <span className="arrow bounce-x d-none d-lg-inline-block">→</span>
          </h1>
        </Button>
        <ul className="work__filters">
          { projectFilters.map(filter => (
            <Button
              key={ filter }
              className="work__filter t-sm"
              onClick={ () => setFilter(filter) }>
              { filter }
              <span className={`arrow bounce-x ${filter === activeFilter ? 'active' : 'd-none d-lg-inline-block'}`}>→</span>
            </Button>
          ))}
        </ul>
      </section>

      <ProjectsList
        activeFilter={ activeFilter }
        projects={ projects }
      />
      
      <RoloBanner { ...exitBanner } />

      <ContactForm />
    </div>
  );
}

export default Work;
