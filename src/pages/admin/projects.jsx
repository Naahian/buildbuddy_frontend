import React, { Component } from 'react';

class ProjectsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    id: 1,
                    title: 'Smart Water Monitor',
                    description: 'IoT-based water quality monitoring system',
                    tags: 'IoT,Water',
                    images: 'https://example.com/image1.jpg',
                    components: 'Water Sensor, WiFi Module'
                }
            ],
            form: {
                title: '',
                description: '',
                tags: '',
                images: '',
                components: ''
            }
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };

    handleAddProject = (e) => {
        e.preventDefault();
        const { title, description, tags, images, components } = this.state.form;
        if (!title || !description || !components) return;

        const newProject = {
            id: this.state.projects.length + 1,
            title,
            description,
            tags,
            images,
            components
        };

        this.setState({
            projects: [...this.state.projects, newProject],
            form: {
                title: '',
                description: '',
                tags: '',
                images: '',
                components: ''
            }
        });
    };

    handleDeleteProject = (id) => {
        const filtered = this.state.projects.filter((p) => p.id !== id);
        this.setState({ projects: filtered });
    };

    render() {
        const { title, description, tags, images, components } = this.state.form;

        return (
            <div>
                <h2 className="mb-4">Manage Projects</h2>

                {/* Form */}
                <form className="mb-4" onSubmit={this.handleAddProject}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={this.handleInputChange}
                                placeholder="Project Title"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="tags"
                                value={tags}
                                onChange={this.handleInputChange}
                                placeholder="Tags (comma separated)"
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="images"
                                value={images}
                                onChange={this.handleInputChange}
                                placeholder="Image URL"
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="components"
                                value={components}
                                onChange={this.handleInputChange}
                                placeholder="Components (comma separated)"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={this.handleInputChange}
                                placeholder="Project Description"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100">
                                Add Project
                            </button>
                        </div>
                    </div>
                </form>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Title</th>
                                <th>Tags</th>
                                <th>Components</th>
                                <th style={{ width: '100px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.title}</td>
                                    <td>{project.tags}</td>
                                    <td>{project.components}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => this.handleDeleteProject(project.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {this.state.projects.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">No projects found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProjectsContent;
