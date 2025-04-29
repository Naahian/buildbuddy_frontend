import React, { Component } from 'react';

class OrdersContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {
                    id: 1,
                    user: 'john@example.com',
                    items: 'Arduino Uno, Breadboard',
                    total: 45.00,
                    status: 'Processing'
                }
            ]
        };
    }

    handleDeleteOrder = (id) => {
        const filtered = this.state.orders.filter((o) => o.id !== id);
        this.setState({ orders: filtered });
    };

    render() {
        return (
            <div>
                <h2 className="mb-4">Manage Orders</h2>

                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>User Email</th>
                                <th>Items</th>
                                <th>Total ($)</th>
                                <th>Status</th>
                                <th style={{ width: '100px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user}</td>
                                    <td>{order.items}</td>
                                    <td>{order.total.toFixed(2)}</td>
                                    <td>{order.status}</td>
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
}

export default OrdersContent;
