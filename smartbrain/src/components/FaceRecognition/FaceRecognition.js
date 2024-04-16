// Import necessary libraries and components
import React from "react";
import "./FaceRecognition.css";

// Define the FaceRecognition functional component, which takes in props of imageUrl and boxes
const FaceRecognition = ({ imageUrl, boxes }) => {
  // Return the JSX elements to be rendered
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />

        {/* Check if boxes is an array before mapping over it */}
        {Array.isArray(boxes) &&
          boxes.map((box, i) => (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default FaceRecognition; // Export the FaceRecognition component
