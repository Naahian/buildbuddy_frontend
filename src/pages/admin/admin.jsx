import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';


class AdminPage extends Component {
    render() {
        return (
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
                    <h4 className="text-center mb-4">Admin Panel</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link to="dashboard" className="nav-link text-white">
                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="users" className="nav-link text-white">
                                <i className="bi bi-people-fill me-2"></i> Users
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="projects" className="nav-link text-white">
                                <i className="bi bi-folder-fill me-2"></i> Projects
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="components" className="nav-link text-white">
                                <i className="bi bi-cpu-fill me-2"></i> Components
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="orders" className="nav-link text-white">
                                <i className="bi bi-bag-fill me-2"></i> Orders
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="buddyai" className="nav-link text-white">
                                <i className="bi bi-robot me-2"></i> Buddy AI
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="flex-grow-1 p-4">
                    <Outlet /> {/* This will render nested routes here */}
                </div>
            </div>
        );
    }
}

export default AdminPage;
