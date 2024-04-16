// Import necessary libraries and components
import React from "react";

// Define a functional component called 'Rank'
// This component receives 'name' and 'entries' as props

const Rank = ({ name, entries }) => {
  // Render a div element as the container for the component

  // Display the 'name' prop and a message about the total number of detected faces
  // Use string interpolation to include the 'name' prop and the 'entries' prop

  // Display the 'entries' prop as the total number of detected faces
  return (
    <div>
      <div className="white b f3">
        {`${name}, the total number of faces you've detected is...`}
      </div>

      <div className="white b f1">{entries}</div>
    </div>
  );
};

export default Rank; // Export the 'Rank' component
