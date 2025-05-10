// src/components/ProjectCard.jsx
import React, { Component } from 'react';

class ProjectCard extends Component {


    render() {
        const { id, title, description, tags } = this.props;
        return (
            <a href={'/projects/' + String(id)} className='text-decoration-none' >
                <div className="card h-100 shadow-sm hover-shadow hover-border">

                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text flex-grow-1">{description}</p>
                        <div>
                            {this.buildTags(tags)}
                        </div>

                    </div>
                </div>
            </a>);
    }

    buildTags(tags) {
        if (!tags) return
        tags = tags.split(',').map((t) => t.trim())
        return tags.map((val) => <span className='m-1 badge text-bg-secondary'>{val}</span>)
    }
}

export default ProjectCard;
