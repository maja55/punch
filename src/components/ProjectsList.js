import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Image from '../components/Image';
import './ProjectsList.scss'


const ProjectsList = ({ projects, projectIds, activeFilter }) => {
  return (
    <div className="projects-list" id="projects">
      { projects.map(({ id, name, tags, thumbnail, href }) => {
        if (projectIds && projectIds.indexOf(id) === -1) return null

        const hide = activeFilter && tags.indexOf(activeFilter) === -1;
        const { src, width, overflow, offsetTop } = thumbnail;
        const AnchorTag = href ? 'a' : Link;
        const anchorProps = href ? { href, target: '_blank' } : { to: `/project/${id}` };

        return (
          <div
            key={ id }
            className={ `projects-list__project w-${width}${overflow ? ' overflow' : ''}${hide ? ' hidden' : ''}` }
            style={ { marginTop: `${offsetTop}px`} }>
            <AnchorTag { ...anchorProps }>
              <div>
                <Image src={ src } alt={ name } />
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
          </div>
        )
      })}
    </div>
  );
}

export default ProjectsList;
