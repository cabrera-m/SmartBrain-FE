// Import necessary libraries and components
import React, { useState } from "react";
import "./SignIn.css";

// Component for user sign-in
const SignIn = ({ loadUser, onRouteChange }) => {
  // Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Event handler for email input changes
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Event handler for password input changes
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle sign-in form submission
  const onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch("https://smartbrainapi-ihb3.onrender.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid email or password.");
        }
      })
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        setError(error.message);
      });
  };

  // Render the sign-in form
  return (
    <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 shadow-5">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Log In"
            />
          </div>
          {error && <p className="mt3 mb0 errorMessage">{error}</p>}
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              href="#0"
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn; // Export the SignIn component
