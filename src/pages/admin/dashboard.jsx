import React, { Component } from 'react';
import OrderChart from '../../components/chart';
import AdminController from '../../conrollers/admin_ctrl';

class DashboardContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            users: [],
            components: [],
            projects: [],
        }

        this.controller = new AdminController(this);
    }

    componentDidMount() {
        this.controller.dashboardInitState(); // now the controller can setState
    }

    render() {
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
                                <p className="card-text fs-4">{this.state.users.length}</p>
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
                                <p className="card-text fs-4">{this.state.components.length}</p>
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
                                <p className="card-text fs-4">{this.state.orders.length}</p>
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
                                <p className="card-text fs-4">{this.state.projects.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='px-5 pb-5'>
                    {this.state.orders ? <OrderChart orders={this.state.orders} /> : "loading"}
                </div>

            </div>
        );
    }


}



export default DashboardContent;