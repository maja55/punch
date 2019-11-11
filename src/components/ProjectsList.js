import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Image from '../components/Image';
import withOnScrollAnimation from '../components/WithOnScrollAnimation'

const ProjectThumbnail = ({ id, name, tags, thumbnail, href }) => {
  const AnchorTag = href ? 'a' : Link;
  const anchorProps = href ? { href, target: '_blank' } : { to: `/project/${id}` };

  return (
    <AnchorTag { ...anchorProps }>
      <div>
        <Image image={ thumbnail } alt={ name } />
        <footer>
          <Button className="projects-list__project-name t-md">
              <span className="t-uppercase d-lg-none">{ name }&nbsp;→</span>
              <span className="d-none d-lg-inline-block no-wrap">
                <span className="t-uppercase">{ name }</span>
                <span className="arrow bounce-x">&nbsp;→</span>
              </span>
          </Button>
          <p className="projects-list__project-tags t-sm">
            { tags.map((tag, i, a) => 
              <span key={ tag }>
                { `${tag}${i < a.length - 1 ? ', ' : ''}` }
              </span>
            ) }
          </p>
        </footer>
      </div>
    </AnchorTag>
  )
}

const ProjectsList = ({ projects }) => {
  const ProjectThumbWithOnScrollAnimation = withOnScrollAnimation(ProjectThumbnail)

  return (
    <div className="projects-list" id="projects">
      { projects.map((project) => (
        <ProjectThumbWithOnScrollAnimation
          { ...project }
          key={ project.id }
          baseClass="fade-in-up projects-list__project"
        />
      ))}
    </div>
  );
}


export default ProjectsList;
