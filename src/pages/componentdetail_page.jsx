import React from 'react';
import AdminController from '../conrollers/admin_ctrl';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { CartService } from '../services/cart_service';

class ComponentDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: null,
            loading: true,
            addedToCart: false,
            quantity: 1
        };

        this.controller = new AdminController(this);
    }

    async componentDidMount() {
        const id = window.location.href.split('/').pop();
        await this.controller.getComponents(id); // assume this sets state.components
        this.setState({ loading: false });
    }

    handleAddToCart = () => {
        if (this.state.loading || !this.state.components) return;

        CartService.addToCart(this.state.components);

        // Show confirmation
        this.setState({ addedToCart: true });
        setTimeout(() => {
            this.setState({ addedToCart: false });
        }, 2000);
    }

    handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            this.setState({ quantity: value });
        }
    }

    render() {
        const { loading, components, addedToCart, quantity } = this.state;

        return (
            <div>
                <Navbar />
                <div className="container my-5">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img
                                src={loading ? "loading" : components.image}
                                alt="Component"
                                className="img-fluid rounded shadow"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h2 className="fw-bold">{loading ? "loading" : components.name}</h2>
                            <h4 className="text-success mt-2">${loading ? "loading" : components.price}</h4>

                            {/* Quantity Control */}
                            <div className="d-flex align-items-center mt-3">
                                <label className="me-2">Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ width: "70px" }}
                                    min="1"
                                    value={quantity}
                                    onChange={this.handleQuantityChange}
                                />
                            </div>

                            {/* Add to Cart */}
                            <button
                                className="btn btn-primary mt-3 px-4 py-2"
                                onClick={this.handleAddToCart}
                                disabled={loading}
                            >
                                <i className="bi bi-cart-plus me-2"></i>Add to Cart
                            </button>

                            {/* Cart Notification */}
                            {addedToCart && (
                                <div className="alert alert-success mt-3" role="alert">
                                    Added to cart! <a href="/cart" className="alert-link">View Cart</a>
                                </div>
                            )}

                            {/* Description */}
                            <div className="row mt-5">
                                <div className="col">
                                    <h5 className="mb-3">Description</h5>
                                    <p className="text-muted">
                                        {loading ? "loading" : components.description}
                                    </p>
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

export default ComponentDetailPage;