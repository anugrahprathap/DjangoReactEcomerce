import React from "react";
import { red } from "@mui/material/colors";
import hero from '../images/hero_image.jpg'
function HeroImage() {
    const imageStyle = {
        backgroundImage: `url(${hero})`, // Set background image
        backgroundSize: 'cover' , // Accessing red color from MUI's color palette
        width: '100%',
        height: '400px',
    };

    return (
        <div style={imageStyle}></div>
    );
}

export default HeroImage;
