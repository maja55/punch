import React, { useState } from 'react';
import ProjectsList from '../components/ProjectsList';
import RoloBanner from '../components/RoloBanner';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';

import data from '../data.json'

const Work = () => {
  const { projects, projectFilters } = data;
  const [activeFilter, setFilter] = useState();
  const [activeProjects, setProjects] = useState(projects);

  const filterProjects = (filter) => {
    let filteredProjects = projects;
    if (filter) filteredProjects = projects.filter(({ tags }) => tags.indexOf(filter) > -1)

    setFilter(filter)
    setProjects(filteredProjects)
  }

  return (
    <div className="page work pt">
      <section className="work__intro mx">
        <Button
          className="work__title"
          onClick={ () => filterProjects() }>
          <h1 className="t-lg t-punch">
            ALL PROJECTS
            <span className="arrow bounce-x d-none d-lg-inline-block">→</span>
          </h1>
        </Button>
        <ul className="work__filters">
          { projectFilters.map(filter => (
            <Button
              key={ filter }
              className="work__filter t-sm"
              onClick={ () => filterProjects(filter) }>
              { filter }
              <span className={`arrow bounce-x ${filter === activeFilter ? 'active' : 'd-none d-lg-inline-block'}`}>→</span>
            </Button>
          ))}
        </ul>
      </section>

      <ProjectsList projects={ activeProjects } />
      
      <RoloBanner />

      <ContactForm />
    </div>
  );
}

export default Work;
