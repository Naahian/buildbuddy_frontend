// src/components/Navbar.jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Assets } from '../services/constants';

class Navbar extends Component {
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        <i className="bi bi-robot bg-warning px-2 py-1 rounded-1 text-dark shadow"></i>
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/explorer">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Dashboard</Link>
                            </li>
                        </ul>
                        <Link className="btn btn-primary btn-sm ms-lg-3" to="/login">Login</Link>
                        <Link className="btn btn-outline-primary btn-sm ms-lg-3" to="/signup">Register</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
