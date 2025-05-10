import { API } from "../api/api";
import { TokenService } from "../services/auth";

export const AuthController = {


    showAlert: (message) => {
        alert(message);
    },


    handleLogin: async (email, password, onSuccess) => {
        const response = await API.login({ email, password });
        if (response.ok) {
            AuthController.onLoginSuccess();
        } else {
            const error = await response.json();
            AuthController.showAlert(error.msg || "Login failed.");
        }
    },


    handleSignup: async (name, email, password, confirmPassword, onSuccess) => {
        if (!name || !email || !password) {
            AuthController.showAlert("All fields are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            AuthController.showAlert("Invalid email.");
            return;
        }
        if (password != confirmPassword) {
            AuthController.showAlert("retyped password did not match.");
            return;
        }
        //api call
        const response = await API.createUser({ name, email, password });
        if (response.ok) {
            AuthController.onSignupSuccess();
            AuthController.showAlert("Signup successful. Please log in.");
        } else {
            const error = await response.json();
            AuthController.showAlert(error.msg || "Signup failed.");
        }
    },


    handleLogout: async () => {
        const response = await API.logout();
        if (response.ok) {
            AuthController.showAlert("successfully logged out.");
            AuthController.onLogoutSuccess();
        } else {
            const error = response;
            AuthController.showAlert(error.msg || "error logging out.");
        }
    },

    onLoginSuccess: () => {
        window.location.href = "/";
    },
    onLogoutSuccess: () => {
        window.location.href = "/";

    },
    onSignupSuccess: () => {
        window.location.href = "/login";
    }
};

