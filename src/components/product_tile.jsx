import React, { Component } from 'react';
import { CartService } from '../services/cart_service'; // Make sure the path is correct

class ProductTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false,
            quantity: 1
        };
    }

    handleAddToCart = () => {
        const { id, title, price, imageUrl } = this.props;

        // Set loading state - immediately show checkmark
        this.setState({ isAdding: true });

        // Prepare component object to add to cart
        const component = {
            id,
            title,
            price,
            imageUrl,
            quantity: this.state.quantity
        };

        // Add to cart using the CartService
        try {
            CartService.addToCart(component);

            // Visual feedback - keep checkmark visible for a moment

        } catch (error) {
            console.error("Error adding to cart:", error);
            this.setState({ isAdding: false });
        }
    };

    render() {
        const { id, imageUrl, title, price } = this.props;
        const { isAdding } = this.state;

        return (
            <div className="container my-3 bg-white">
                <div className="row border rounded p-3 align-items-center">
                    <div className="col-md-3">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="img-fluid rounded"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <h5 className="mb-2">{title}</h5>
                        <h6 className="mb-2 text-primary">${price}</h6>
                    </div>
                    <div className="col-md-1">
                        <button
                            className={`btn btn-sm ${isAdding ? 'btn-success' : 'btn-dark'}`}
                            onClick={this.handleAddToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? (
                                <i className="bi bi-check-lg"></i>
                            ) : (
                                <i className="bi bi-plus-lg"></i>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductTile;