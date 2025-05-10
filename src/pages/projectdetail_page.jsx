import React from 'react';
import AdminController from '../conrollers/admin_ctrl'; // adjust the path as needed
import Navbar from '../components/navbar';

class ProjectDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: null,
            loading: true,
        };

        this.controller = new AdminController(this);
    }

    async componentDidMount() {
        const id = window.location.href.split('/').pop();
        await this.controller.getProjects(id);
        this.setState({ loading: false });
    }

    renderTags(tagsStr) {
        if (!tagsStr) return null;
        return tagsStr.split(',').map(tag => (
            <span key={tag.trim()} className="badge bg-secondary me-2">{tag.trim()}</span>
        ));
    }

    renderComponents(compIds) {
        if (!Array.isArray(compIds) || compIds.length === 0) return <p>No components listed.</p>;
        return (
            <ul className="list-group">
                {compIds.map(id => (
                    <li key={id} className="list-group-item">Component ID: {id}</li>
                ))}
            </ul>
        );
    }

    render() {
        const { projects, loading } = this.state;

        if (loading) return <div className="text-center mt-5">Loading...</div>;

        return (
            <div>
                <Navbar />
                <div className="container my-5">
                    <h2 className="fw-bold mb-3">{projects.title}</h2>
                    <p className="text-muted">Created At: {new Date(projects.created_at).toLocaleString()}</p>

                    <div className="mb-3">
                        <h5>Description</h5>
                        <p>{projects.description || "No description provided."}</p>
                    </div>

                    <div className="mb-3">
                        <h5>Tags</h5>
                        {this.renderTags(projects.tags)}
                    </div>

                    <div className="mb-3">
                        <h5>Component IDs</h5>
                        {this.renderComponents(projects.component_ids)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectDetailPage;
