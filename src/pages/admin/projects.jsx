import React, { Component } from 'react';
import AdminController from '../../conrollers/admin_ctrl';


class ProjectsContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            title: null,
            image: null,
            tags: null,
            components: null,
            description: null,
        }

        this.controller = new AdminController(this);
    }

    componentDidMount() {
        this.controller.projectsInitState(); // now the controller can setState
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddProject = (e) => {
        e.preventDefault();
        let { title, image, tags, components, description } = this.state;

        // Convert comma-separated strings to arrays
        components = components.split(',').map(comp => parseInt(comp.trim()))
            .filter(comp => !isNaN(comp));

        console.log(tags)

        if (!title || !image || !description || components.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        const projectData = {
            title,
            image,
            components,
            tags,
            description,
        };

        this.controller.createProject(projectData);
    };



    handleDeleteProject = (id) => {
        this.controller.deleteProject(id);
    };

    render() {

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
                                value={this.state.title}
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
                                value={this.state.tags}
                                onChange={this.handleInputChange}
                                placeholder="Tags (comma separated)"
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleInputChange}
                                placeholder="Image URL"
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="components"
                                value={this.state.components}
                                onChange={this.handleInputChange}
                                placeholder="Components Ids (comma separated)"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                className="form-control"
                                name="description"
                                value={this.state.description}
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
