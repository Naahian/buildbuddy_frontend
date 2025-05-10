import React, { Component } from 'react';
import AdminController from '../../conrollers/admin_ctrl';


class OrdersContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            userId: null,
            components: null,
            price: null,
        }

        this.controller = new AdminController(this);
    }

    componentDidMount() {
        this.controller.ordersInitState(); // now the controller can setState
    }


    handleDeleteOrder = (id) => {
        this.controller.deleteOrder(id);
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let compopnetIds = this.state.components.split(',').map(id => parseInt(id.trim()))
        console.log("comp ids")
        console.log(this.state.components)
        console.log(compopnetIds)

        let data = {
            "user_id": this.state.userId,
            "total_price": this.state.price,
            "component_ids": compopnetIds
        }

        this.controller.createOrder(data);
    }

    render() {
        console.log(this.state.orders)
        return (
            <div>
                <h2 className="mb-4">Manage Orders</h2>
                {this.orderForm()}
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Items</th>
                                <th>Total ($)</th>
                                <th>Delivery Date</th>
                                <th>Status</th>
                                <th style={{ width: '100px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.length == 0 ? null : this.state.orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user_id}</td>
                                    <td>{order.component_ids.join(',')}</td>
                                    <td>{order.total_price}</td>
                                    <td>{order.delivery_date}</td>
                                    <td>{order.delivered ? "Delivered ✅" : "Not Delivered ❗"}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => this.handleDeleteOrder(order.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {this.state.orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    orderForm() {

        return (
            <form onSubmit={this.handleSubmit} className="mb-4">
                <div className='row'>
                    <div className="mb-3 col">
                        <label className="form-label">User ID</label>
                        <input
                            name='userId'
                            type="text"
                            className="form-control"
                            value={this.state.userId}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3 col">
                        <label className="form-label">Component IDs (comma-separated)</label>
                        <input
                            name='components'
                            type="text"
                            className="form-control"
                            value={this.state.components}
                            onChange={this.handleInputChange}
                            placeholder="e.g. 1,2,5"
                            required
                        />
                    </div>

                    <div className="mb-3 col">
                        <label className="form-label">Total Price ($)</label>
                        <input
                            name='price'
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                </div>
                <button type="submit" className="btn btn-success">
                    Create Order
                </button>
            </form>
        );
    }

}

export default OrdersContent;
