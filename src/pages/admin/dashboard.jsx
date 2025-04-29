import React, { Component } from 'react';

class DashboardContent extends Component {
    render() {
        // Dummy recent activity data
        const activities = [
            { type: 'User', activity: 'New user registered: john_doe' },
            { type: 'Component', activity: 'Added new sensor module to catalog' },
            { type: 'Order', activity: 'Order #1042 placed by alice' },
            { type: 'Project', activity: 'New project: AI Plant Monitor' },
            { type: 'User', activity: 'User mike updated profile info' }
        ];

        // Dummy values – Replace with real data from props, context, or API
        const stats = {
            users: 1280,
            components: 342,
            orders: 216,
            projects: 154
        };

        return (
            <div>
                <h2 className="mb-4">Admin Dashboard</h2>

                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card text-white bg-primary h-100 shadow-sm">
                            <div className="card-body d-flex flex-column align-items-start">
                                <div className="mb-3">
                                    <i className="bi bi-people-fill fs-1"></i>
                                </div>
                                <h5 className="card-title">Total Users</h5>
                                <p className="card-text fs-4">{stats.users}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card text-white bg-dark h-100 shadow-sm">
                            <div className="card-body d-flex flex-column align-items-start">
                                <div className="mb-3">
                                    <i className="bi bi-cpu-fill fs-1"></i>
                                </div>
                                <h5 className="card-title">Total Components</h5>
                                <p className="card-text fs-4">{stats.components}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card text-white bg-primary h-100 shadow-sm">
                            <div className="card-body d-flex flex-column align-items-start">
                                <div className="mb-3">
                                    <i className="bi bi-bag-fill fs-1"></i>
                                </div>
                                <h5 className="card-title">Total Orders</h5>
                                <p className="card-text fs-4">{stats.orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card text-white bg-dark h-100 shadow-sm">
                            <div className="card-body d-flex flex-column align-items-start">
                                <div className="mb-3">
                                    <i className="bi bi-folder-fill fs-1"></i>
                                </div>
                                <h5 className="card-title">Total Projects</h5>
                                <p className="card-text fs-4">{stats.projects}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <h4>Recent Activity</h4>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Type</th>
                                    <th>Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <span className={`badge bg-${this.getBadgeColor(item.type)} text-uppercase`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td>{item.activity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    getBadgeColor(type) {
        switch (type.toLowerCase()) {
            case 'user':
                return 'primary';
            case 'component':
                return 'success';
            case 'order':
                return 'warning';
            case 'project':
                return 'info';
            default:
                return 'secondary';
        }
    }
}

export default DashboardContent;
