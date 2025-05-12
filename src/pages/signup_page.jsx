// src/pages/Signup.jsx
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import { AuthController } from '../conrollers/auth_ctrl';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = this.state;
        AuthController.handleSignup(name, email, password, confirmPassword);
    };

    render() {
        document.body.style = "background:#eee";


        return (
            <div>
                <Navbar />

                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="col-md-6">
                        <div className="card shadow-sm p-4">
                            <h3 className="mb-4 text-center">Create an Account</h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>

                            <div className="mt-3 text-center">
                                <small>Already have an account? <Link to="/login">Login</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
