import React from "react";
import hero from '../images/hero_image.jpg';
import { Container } from 'react-bootstrap'; // Import Container component from Bootstrap

function HeroImage() {
    return (
        <Container fluid className="p-0" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', height: '400px' }}>
            {/* No need for an extra div, directly apply styles */}
        </Container>
    );
}

export default HeroImage;
