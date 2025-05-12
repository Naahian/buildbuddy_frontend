import React from 'react';
import { CartService } from '../services/cart_service';
import { OrderService } from '../services/order_service';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { API } from '../api/api';
import { Link } from 'react-router-dom';

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            cartItemDetails: [],
            cartTotal: 0,
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                cardName: '',
                cardNumber: '',
                expDate: '',
                cvv: ''
            },
            errors: {},
            loading: false,
            orderPlaced: false,
            orderId: null
        };
    }

    async componentDidMount() {
        await this.loadCartData();

        // Redirect to cart if cart is empty
        if (this.state.cartItems.length === 0) {
            // window.location.href = '/cart';
        }
    }

    loadCartData = async () => {
        const cartItems = CartService.getCart();

        // Get component details for cart items
        const componentDetails = await OrderService.getComponentDetails(cartItems);

        // Calculate cart total
        let cartTotal = 0;
        const cartItemDetails = cartItems.map(item => {
            const component = componentDetails.find(c => c.id === item.id);
            if (component) {
                cartTotal += component.price * item.quantity;
                return {
                    ...component,
                    quantity: item.quantity
                };
            }
            return null;
        }).filter(item => item !== null);

        this.setState({ cartItems, cartItemDetails, cartTotal });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    }

    validateForm = () => {
        const { formData } = this.state;
        const errors = {};

        // Basic validation rules
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.city.trim()) errors.city = 'City is required';
        if (!formData.state.trim()) errors.state = 'State is required';
        if (!formData.zipCode.trim()) errors.zipCode = 'Zip code is required';

        // Payment validation
        if (!formData.cardName.trim()) errors.cardName = 'Name on card is required';
        if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
        if (!formData.expDate.trim()) errors.expDate = 'Expiration date is required';
        if (!formData.cvv.trim()) errors.cvv = 'CVV is required';

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.setState({ loading: true });
        try {
            const current_user = await API.getCurrentUser();
            const orderInfo = {
                user_id: current_user.id,
                component_ids: this.state.cartItemDetails.map(item => item.id),
                total_price: this.state.cartTotal
            };

            // Create order using OrderService
            const result = await OrderService.placeOrder(orderInfo);


            if (result.success) {
                this.setState({
                    orderPlaced: true,
                    orderId: result.orderId,
                    loading: false
                });
            } else {
                throw new Error(result.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            this.setState({
                loading: false,
                errors: { ...this.state.errors, general: error.message || 'Failed to place order. Please try again.' }
            });
        }
    }

    render() {
        const { cartItemDetails, cartTotal, formData, errors, loading, orderPlaced, orderId } = this.state;

        // Show order confirmation if order is placed
        if (orderPlaced) {
            return (
                <div>
                    <Navbar />
                    <div className="container my-5">
                        <div className="text-center py-5">
                            <div className="display-1 text-success mb-4">
                                <i className="bi bi-check-circle"></i>
                            </div>
                            <h1 className="display-4">Thank You!</h1>
                            <p className="lead">Your order has been placed successfully.</p>
                            <p>Order Number: <strong>#{orderId}</strong></p>
                            <p className="text-muted">You will receive an email confirmation shortly.</p>
                            <div className="mt-4">
                                <Link to="/" className="btn btn-primary me-3">Continue Shopping</Link>
                                <Link to="/orders" className="btn btn-outline-secondary">View My Orders</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div>
                <Navbar />
                <div className="container my-5">
                    <h2 className="mb-4">Checkout</h2>

                    {errors.general && (
                        <div className="alert alert-danger" role="alert">
                            {errors.general}
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={this.handleSubmit}>
                                <div className="card mb-4">
                                    <div className="card-header bg-light">
                                        <h5 className="mb-0">Shipping Information</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={this.handleInputChange}
                                                />
                                                {errors.firstName && (
                                                    <div className="invalid-feedback">{errors.firstName}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={this.handleInputChange}
                                                />
                                                {errors.lastName && (
                                                    <div className="invalid-feedback">{errors.lastName}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={this.handleInputChange}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={this.handleInputChange}
                                            />
                                            {errors.address && (
                                                <div className="invalid-feedback">{errors.address}</div>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={this.handleInputChange}
                                                />
                                                {errors.city && (
                                                    <div className="invalid-feedback">{errors.city}</div>
                                                )}
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="state" className="form-label">State</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                                    id="state"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={this.handleInputChange}
                                                />
                                                {errors.state && (
                                                    <div className="invalid-feedback">{errors.state}</div>
                                                )}
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                                                    id="zipCode"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={this.handleInputChange}
                                                />
                                                {errors.zipCode && (
                                                    <div className="invalid-feedback">{errors.zipCode}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-4">
                                    <div className="card-header bg-light">
                                        <h5 className="mb-0">Payment Information</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="cardName" className="form-label">Name on Card</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                                                id="cardName"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={this.handleInputChange}
                                            />
                                            {errors.cardName && (
                                                <div className="invalid-feedback">{errors.cardName}</div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={this.handleInputChange}
                                                placeholder="XXXX XXXX XXXX XXXX"
                                            />
                                            {errors.cardNumber && (
                                                <div className="invalid-feedback">{errors.cardNumber}</div>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="expDate" className="form-label">Expiration Date</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.expDate ? 'is-invalid' : ''}`}
                                                    id="expDate"
                                                    name="expDate"
                                                    value={formData.expDate}
                                                    onChange={this.handleInputChange}
                                                    placeholder="MM/YY"
                                                />
                                                {errors.expDate && (
                                                    <div className="invalid-feedback">{errors.expDate}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cvv" className="form-label">CVV</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                                                    id="cvv"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={this.handleInputChange}
                                                    placeholder="123"
                                                />
                                                {errors.cvv && (
                                                    <div className="invalid-feedback">{errors.cvv}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            'Place Order'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-header bg-dark text-light ">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <div className="list-group list-group-flush">
                                        {cartItemDetails.map(item => (
                                            <div key={item.id} className="list-group-item px-0">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="me-3"
                                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                        />
                                                        <div>
                                                            <h6 className="mb-0">{item.name}</h6>
                                                            <small className="text-muted">Qty: {item.quantity}</small>
                                                        </div>
                                                    </div>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Shipping:</span>
                                        <span>Free</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold">
                                        <span>Total:</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CheckoutPage;