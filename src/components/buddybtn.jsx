import React from "react";

function AskBuddyButton(large = false) {
    const gradientBorderStyle = {
        position: 'relative',
        borderRadius: '35px',
        padding: '4px',
        background: 'linear-gradient(to right, #FF4500, #1E90FF, #32cd32)',
    };

    const gradientBorderInnerStyle = {
        borderRadius: '30px',
        backgroundColor: 'white', // change to '#121212' or similar for dark theme
        padding: '12px 22px',
    };

    const gradientText = {
        background: 'linear-gradient(to right, #FF4500, #1E90FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }

    return <Link to="/buddyai" className="btn btn-light me-2 shadow" style={gradientBorderStyle}>
        <div style={gradientBorderInnerStyle}>
            Ask Buddy AI <i class="bi bi-stars" style={gradientText}></i>
        </div>
    </Link>;
}

export default AskBuddyButton;