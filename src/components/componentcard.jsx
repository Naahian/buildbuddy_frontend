// src/components/ComponentCard.jsx
import React, { Component } from 'react';

class ComponentCard extends Component {
    handleClick = () => {
        const { onClick } = this.props;
        if (onClick) onClick();
    };

    render() {
        const { name, price, image } = this.props;

        return (
            <a href='#' className='text-decoration-none'>
                <div
                    className="card shadow-sm h-100 hover-border"
                    onClick={this.handleClick}
                    data-mdb-ripple-init
                    data-mdb-ripple-color="light"
                >
                    {image && (
                        <img
                            src={image}
                            className="card-img-top"
                            alt={name}
                            style={{ height: '300px', objectFit: 'cover', padding: '1rem' }}
                        />
                    )}
                    <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text text-muted mb-2">₹{price}</p>
                        </div>

                    </div>
                </div>
            </a>
        );
    }
}

export default ComponentCard;
