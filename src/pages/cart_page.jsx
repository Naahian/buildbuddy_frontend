import React from 'react';
import { CartService } from '../services/cart_service';
import { OrderService } from '../services/order_service';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            cartItemDetails: [],
            cartTotal: 0,
            loading: true
        };
    }

    async componentDidMount() {
        await this.loadCartData();
    }

    loadCartData = async () => {
        try {
            const cartItems = CartService.getCart();

            if (cartItems.length === 0) {
                this.setState({ cartItems: [], cartItemDetails: [], cartTotal: 0, loading: false });
                return;
            }

            // Get full component details for all items in cart
            const componentDetails = await OrderService.getComponentDetails(cartItems);

            // Map cart items with their details and calculate total
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

            this.setState({
                cartItems,
                cartItemDetails,
                cartTotal,
                loading: false
            });
        } catch (error) {
            console.error("Error loading cart data:", error);
            this.setState({ loading: false });
        }
    }

    handleRemoveItem = (id) => {
        CartService.removeFromCart(id);
        this.loadCartData();
    }

    handleQuantityChange = (id, quantity) => {
        CartService.updateQuantity(id, parseInt(quantity, 10));
        this.loadCartData();
    }

    handleQuantityDecrement = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            this.handleQuantityChange(id, currentQuantity - 1);
        }
    }

    handleQuantityIncrement = (id, currentQuantity) => {
        this.handleQuantityChange(id, currentQuantity + 1);
    }

    render() {
        const { cartItemDetails, cartTotal, loading } = this.state;

        return (
            <div>
                <Navbar />
                <div className="container my-5">
                    <h2 className="mb-4">Your Cart</h2>

                    {cartItemDetails.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-cart4 display-1 text-muted"></i>
                            <h3 className="mt-3">Your cart is empty</h3>
                            <p className="text-muted">Looks like you haven't added any items to your cart yet.</p>
                            <Link to="/" className="btn btn-primary mt-3">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <>

                            <div className="row mt-4">
                                <div className="col-md-8">

                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="100">Product</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItemDetails.map(item => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="img-thumbnail"
                                                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Link to={`/components/${item.id}`} className="text-decoration-none">
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td>${item.price.toFixed(2)}</td>
                                                        <td>
                                                            <div className="input-group" style={{ width: "120px" }}>
                                                                <button
                                                                    className="btn btn-outline-secondary btn-sm"
                                                                    type="button"
                                                                    onClick={() => this.handleQuantityDecrement(item.id, item.quantity)}
                                                                >
                                                                    <i className="bi bi-dash"></i>
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    className="form-control form-control-sm text-center"
                                                                    value={item.quantity}
                                                                    onChange={(e) => this.handleQuantityChange(item.id, e.target.value)}
                                                                    min="1"
                                                                />
                                                                <button
                                                                    className="btn btn-outline-secondary btn-sm"
                                                                    type="button"
                                                                    onClick={() => this.handleQuantityIncrement(item.id, item.quantity)}
                                                                >
                                                                    <i className="bi bi-plus"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => this.handleRemoveItem(item.id)}
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <Link to="/" className="btn btn-outline-primary">
                                        <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                                    </Link>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Order Summary</h5>
                                            <div className="d-flex justify-content-between mt-3">
                                                <span>Subtotal:</span>
                                                <span>${cartTotal.toFixed(2)}</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between fw-bold">
                                                <span>Total:</span>
                                                <span>${cartTotal.toFixed(2)}</span>
                                            </div>
                                            <Link
                                                to="/checkout"
                                                className="btn btn-success w-100 mt-3"
                                            >
                                                Proceed to Checkout
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <hr style={{ marginTop: "15rem" }} />
                <Footer />
            </div>
        );
    }
}

export default CartPage;