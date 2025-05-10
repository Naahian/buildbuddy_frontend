// src/pages/Login.jsx
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import { AuthController } from '../conrollers/auth_ctrl';
import { redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        AuthController.handleLogin(email, password);
    };

    render() {
        const { alertMessage, alertType } = this.state;
        document.body.style = "background:#eee";

        return (
            <div>
                {alertMessage && (
                    <div className={`alert alert-${alertType}`} role="alert">
                        {alertMessage}
                    </div>
                )}
                <Navbar />
                <br />
                <div className="container d-flex justify-content-center align-items-center mt-5">
                    <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={this.handleSubmit}>
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

                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
