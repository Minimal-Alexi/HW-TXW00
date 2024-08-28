import React from 'react';

// Function to convert RGB to Hex
const rgbToHex = (r, g, b) => {
    const clamp = (value) => Math.max(0, Math.min(255, value));
    const toHex = (value) => {
        const hex = clamp(value).toString(16).toUpperCase();
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const BoxColour = (props) => {
    // Destructure the RGB values from props
    const { r, g, b } = props;
    // Convert RGB to Hex
    const hexColor = rgbToHex(r, g, b);

    return (
        <div 
            className="rectangle" 
            style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
        >
            <p>rgb({r}, {g}, {b})</p>
            <p>{hexColor}</p>
        </div>
    );
};

export default BoxColour;