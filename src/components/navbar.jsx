// src/components/Navbar.jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TokenService } from '../services/auth.js';
import { AuthController } from '../conrollers/auth_ctrl';
class Navbar extends Component {
    logoutEvent = () => {
        AuthController.handleLogout();
    }

    render() {
        var dashboard = null;
        var loginbtn = <Link className="btn btn-primary btn-sm ms-lg-3" to="/login">Login</Link>
        var signupbtn = <Link className="btn btn-outline-primary btn-sm ms-lg-3" to="/signup">Register</Link>;
        var logoutbtn = null;

        var isAuthenticated = TokenService.getAccessToken();
        if (isAuthenticated) {
            loginbtn = null;
            signupbtn = null;
            logoutbtn = <button className="btn btn-outline-danger btn-sm ms-lg-3" onClick={this.logoutEvent}>Logout</button>;
            dashboard = <Link className="btn btn-secondary btn-sm ms-lg-3" to="/admin/dashboard">Dashboard</Link>;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{ background: "#121212" }}>
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-3" to="/">
                        <span> BuildBuddy</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <Link className="nav-link" to="/shop">All Products</Link>
                            <Link className="nav-link" to="/projects">Projects</Link>
                            <Link className="nav-link" to="/cart"><i class="bi bi-cart4"></i></Link>
                        </ul>
                        {dashboard}
                        {logoutbtn}
                        {loginbtn}
                        {signupbtn}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
