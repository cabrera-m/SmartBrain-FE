// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

window.process = {}; // Initialize the process object for certain environments without it

// Set the initial state of the components
const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

// Initialize the App component function
function App() {
  // Initialize state variables using the useState hook
  const [input, setInput] = useState(initialState.input); // Holds the input image URL
  const [imageUrl, setImageURL] = useState(initialState.imageUrl); // Holds the displayed image URL
  const [boxes, setBoxes] = useState(initialState.boxes); // Holds the face bounding boxes
  const [route, setRoute] = useState(initialState.route); // Holds the current route (page)
  const [isSignedIn, setIsSignedIn] = useState(initialState.isSignedIn); // Holds the signed-in status
  const [user, setUser] = useState(initialState.user); // Holds the user data

  // Load user data from local storage
  const loadUser = (data) => {
    console.log(data);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
    setImageURL(initialState.imageUrl);
    setBoxes(initialState.boxes);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  // Retrieve user data from local storage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      setIsSignedIn(true);
      setRoute("home");
    }
  }, []);

  // Sign out function
  const onSignOut = () => {
    setUser(initialState.user);
    setIsSignedIn(false);
    setRoute("signin");
    localStorage.removeItem("userData");
  };

  // Calculate face locations from Clarifai API response
  const calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  // Display face bounding boxes
  const displayFaceBoxes = (boxes) => {
    setBoxes(boxes);
  };

  // Handle input change event
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handle picture submit
  const onPictureSubmit = () => {
    setImageURL(input);
    fetch("https://smartbrainapi-ihb3.onrender.com/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://smartbrainapi-ihb3.onrender.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              const updatedUser = { ...user, entries: count };
              setUser(updatedUser);
              localStorage.setItem("userData", JSON.stringify(updatedUser));
            })
            .catch(console.log);
        }
        const faceLocations = calculateFaceLocations(response);
        displayFaceBoxes(faceLocations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle route change
  const onRouteChange = (route) => {
    if (route === "signout") {
      // Reset all state variables to initial values
      setInput(initialState.input);
      setImageURL(initialState.imageUrl);
      setBoxes(initialState.boxes);
      setIsSignedIn(initialState.isSignedIn);
      setUser(initialState.user);
    } else if (route === "home") {
      setIsSignedIn(true); // User is navigating to home, so set isSignedIn to true
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#ffffff" num={215} bg={true} />
      <Navigation
        onSignOut={onSignOut}
        isSignedIn={isSignedIn}
        route={route}
        onRouteChange={onRouteChange}
      />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank
            name={user.name}
            entries={user.entries}
            isSignedIn={isSignedIn}
          />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </div>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App; // Export the App component as the default export
