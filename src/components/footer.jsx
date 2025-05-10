import React, { Component } from "react";

class Footer extends Component {
    render() {
        return <footer className="text-white py-4" style={{ background: "#1e1e1e" }}>
            <div className="container text-center">
                <p className="mb-1">&copy; 2025 BuildBuddy. All rights reserved.</p>
            </div>
        </footer>;
    }
}


export default Footer;