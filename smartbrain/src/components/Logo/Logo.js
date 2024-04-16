// Import necessary libraries and components
import React from "react";
import Tilt from "react-parallax-tilt";
import logo from "./sblogo.png";
import "./Logo.css";

// Define the Logo component
const Logo = () => {
  // Return the JSX structure for the Logo component
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        // Pass the Logo component as an option to the Tilt component
        options={Logo}
        style={{ max: 55, height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          {/* Include the logo image with alternative text */}
          <img style={{ paddingTop: "0px" }} src={logo} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo; // Export the Logo component for use in other parts of the application
