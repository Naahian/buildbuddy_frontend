import React, { Component } from 'react';

class ComponentsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [
                {
                    id: 1,
                    name: 'Arduino Uno',
                    price: 25.0,
                    description: 'A popular microcontroller board based on the ATmega328P.'
                }
            ],
            form: {
                name: '',
                price: '',
                description: ''
            }
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };

    handleAddComponent = (e) => {
        e.preventDefault();
        const { name, price, description } = this.state.form;
        if (!name || !price || !description) return;

        const newComponent = {
            id: this.state.components.length + 1,
            name,
            price: parseFloat(price),
            description
        };

        this.setState({
            components: [...this.state.components, newComponent],
            form: { name: '', price: '', description: '' }
        });
    };

    handleDeleteComponent = (id) => {
        const filtered = this.state.components.filter((c) => c.id !== id);
        this.setState({ components: filtered });
    };

    render() {
        const { name, price, description } = this.state.form;

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
                                value={name}
                                onChange={this.handleInputChange}
                                placeholder="Component Name"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="price"
                                value={price}
                                onChange={this.handleInputChange}
                                placeholder="Price"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                className="form-control"
                                name="description"
                                value={description}
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
