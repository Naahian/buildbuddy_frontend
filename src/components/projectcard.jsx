// src/components/ProjectCard.jsx
import React, { Component } from 'react';

class ProjectCard extends Component {


    render() {
        const { image, title, description, onViewClick } = this.props;

        return (
            <a href='#' className='text-decoration-none' >
                <div className="card h-100 shadow-sm hover-shadow hover-border">
                    {image && (
                        <img
                            src={image}
                            className="card-img-top"
                            alt={title}
                            style={{ height: '200px', objectFit: 'cover' }}
                        />
                    )}
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text flex-grow-1">{description}</p>

                        <div>
                            <span className='m-1 badge text-bg-secondary'>tagname</span>
                            <span className='m-1 badge text-bg-secondary'>tagname</span>
                            <span className='m-1 badge text-bg-secondary'>tagname</span>
                        </div>
                    </div>
                </div>
            </a>);
    }
}

export default ProjectCard;
