// src/services/OrderService.js

import { API } from "../api/api";
import { CartService } from "./cart_service";
import { TokenService } from "./auth";

export class OrderService {

    static async placeOrder(orderInfo) {
        const response = await API.createOrder(orderInfo);
        return response;
    }

    static async getComponentDetails(componentIds) {
        try {
            // Fetch all components from API
            const allComponents = await API.getComponents();

            // Filter only the components that are in the cart
            return allComponents.filter(component =>
                componentIds.some(item => item.id === component.id)
            );
        } catch (error) {
            console.error("Error fetching component details:", error);
            return [];
        }
    }

    static async createOrderFromCart(shippingInfo) {
        try {
            // Get current cart
            const cartItems = CartService.getCart();

            // If cart is empty, return error
            if (!cartItems || cartItems.length === 0) {
                return { success: false, message: "Cart is empty" };
            }

            // Get user ID from JWT token
            let userId = null;
            const accessToken = TokenService.getAccessToken();

            if (accessToken) {
                try {
                    // Simple JWT decode (in production, use a proper JWT library)
                    const payload = JSON.parse(atob(accessToken.split('.')[1]));
                    userId = payload.user_id || payload.sub;
                } catch (e) {
                    console.error("Error decoding token:", e);
                }
            }

            // If no user ID from token, check if one was provided in shipping info
            if (!userId && shippingInfo && shippingInfo.userId) {
                userId = shippingInfo.userId;
            }

            // Fall back to guest user (ID 1) if no user ID found
            if (!userId) {
                userId = 1; // Guest user ID
            }

            // Get component details to calculate total price
            const componentDetails = await this.getComponentDetails(cartItems);

            // Calculate total price
            let totalPrice = 0;
            for (const cartItem of cartItems) {
                const component = componentDetails.find(c => c.id === cartItem.id);
                if (component) {
                    totalPrice += component.price * cartItem.quantity;
                }
            }

            // Create order object based on Order model
            const orderData = {
                user_id: userId,
                total_price: totalPrice,
                component_ids: cartItems, // Already in format {id, quantity}
                delivery_date: this.calculateDeliveryDate(3), // 3 days from now
                delivered: false
            };

            // Add shipping info if provided
            if (shippingInfo) {
                orderData.shipping_info = shippingInfo;
            }

            // Submit to API
            const response = await API.createOrder(orderData);

            // If order creation was successful
            if (response && response.id) {
                // Clear cart
                CartService.clearCart();
                return {
                    success: true,
                    orderId: response.id,
                    order: response
                };
            } else {
                return {
                    success: false,
                    message: "Failed to create order"
                };
            }

        } catch (error) {
            console.error("Error creating order:", error);
            return {
                success: false,
                message: "Error creating order: " + error.message
            };
        }
    }

    static calculateDeliveryDate(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString();
    }
}