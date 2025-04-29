import React, { Component } from 'react';

class UsersContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ],
            name: '',
            email: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddUser = (e) => {
        e.preventDefault();
        const { name, email, users } = this.state;

        if (!name || !email) return;

        const newUser = {
            id: users.length + 1,
            name,
            email
        };

        this.setState({
            users: [...users, newUser],
            name: '',
            email: ''
        });
    };

    handleDeleteUser = (id) => {
        const filteredUsers = this.state.users.filter(user => user.id !== id);
        this.setState({ users: filteredUsers });
    };

    render() {
        const { users, name, email, password } = this.state;

        return (
            <div>
                <h2 className="mb-4">Manage Users</h2>

                {/* Add User Form */}
                <form className="mb-4" onSubmit={this.handleAddUser}>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary w-100">
                                Add User
                            </button>
                        </div>
                    </div>
                </form>

                {/* Users Table */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th style={{ width: '120px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => this.handleDeleteUser(user.id)}
                                            >
                                                <i className="bi bi-trash-fill"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UsersContent;
