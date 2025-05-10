import React, { Component } from 'react';
import AdminController from '../../conrollers/admin_ctrl';


class ComponentsContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            components: [],
            name: null,
            price: null,
            image: null,
            description: null,
        }

        this.controller = new AdminController(this);
    }

    componentDidMount() {
        this.controller.componentsInitState(); // now the controller can setState
    }


    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddComponent = (e) => {
        e.preventDefault();
        let { name, price, description, image } = this.state;

        if (!name || !price || !description) {
            alert("Please fill in all required fields.");
            return;
        }

        const componentData = {
            name,
            price,
            description,
            image
        };

        this.controller.createComponent(componentData);
    };

    handleDeleteComponent = (id) => {
        this.controller.deleteComponent(id);
    };

    render() {

        return (
            <div>
                <h2 className="mb-4">Manage Components</h2>

                {/* Form */}
                <form className="mb-4" onSubmit={this.handleAddComponent}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="Component Name"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleInputChange}
                                placeholder="image url"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleInputChange}
                                placeholder="Price"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                className="form-control"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                placeholder="Component Description"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100">
                                Add Component
                            </button>
                        </div>
                    </div>
                </form>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Price ($)</th>
                                <th>Description</th>
                                <th style={{ width: '100px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.components.map((component) => (
                                <tr key={component.id}>
                                    <td>{component.name}</td>
                                    <td>{component.price.toFixed(2)}</td>
                                    <td>{component.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => this.handleDeleteComponent(component.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {this.state.components.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">No components found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ComponentsContent;
