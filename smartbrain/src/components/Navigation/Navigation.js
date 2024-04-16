import React from "react";

// Navigation component that renders a navigation bar based on user's sign-in status
const Navigation = ({ onRouteChange, isSignedIn, onSignOut }) => {
  // Render sign-in and register options if user is not signed in
  if (!isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
  // Render sign-out option if user is signed in
  else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onSignOut("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  }
};

export default Navigation; // Export the Navigation component
