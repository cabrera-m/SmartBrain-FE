// Import necessary libraries and components
import React from "react";
import "./ImageLinkForm.css";

// Create a functional component called ImageLinkForm which takes in two props: onInputChange and onPictureSubmit
const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    // Render a div for the form
    <div>
      {/* Add a paragraph tag with a class of fw5 f3 mb-4 to display a message */}
      <p className="fw5 f3 mb-4">
        {"Smart Brain is ready to detect faces in your pictures."}
      </p>

      {/* Create a centered div */}
      <div className="center">
        {/* Add a form with a class of form center pa4 br3 shadow-5 */}
        <div className="form center pa4 br3 shadow-5">
          {/* Add an input field with a class of f4 pa2 w-70 center that takes in a placeholder, type, and onChange event */}
          <input
            className="f4 pa2 w-70 center"
            placeholder="Http://"
            type="tex"
            onChange={onInputChange}
          />

          {/* Add a submit button with a class of w-25 f4 link ph3 pv2 dib white bg-green that takes in an onClick event */}
          <button
            className="w-25 f4 link ph3 pv2 dib white bg-green"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm; // Export the ImageLinkForm component
