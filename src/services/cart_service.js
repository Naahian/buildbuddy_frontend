// src/services/CartService.js

import { API } from "../api/api";

export class CartService {
    static getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static addToCart(component) {
        const cart = this.getCart();

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === component.id);

        if (existingItemIndex >= 0) {
            // Item exists, increment quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // Item doesn't exist, add with quantity 1
            cart.push({
                id: component.id,
                quantity: 1
            });
        }

        this.saveCart(cart);
        return cart;
    }

    static removeFromCart(componentId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== componentId);
        this.saveCart(cart);
        return cart;
    }

    static updateQuantity(componentId, quantity) {
        const cart = this.getCart();
        const itemIndex = cart.findIndex(item => item.id === componentId);

        if (itemIndex >= 0) {
            cart[itemIndex].quantity = quantity;

            // Remove item if quantity is 0
            if (quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }

        this.saveCart(cart);
        return cart;
    }

    static clearCart() {
        localStorage.removeItem('cart');
        return [];
    }

    static getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    static getCartCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }


}