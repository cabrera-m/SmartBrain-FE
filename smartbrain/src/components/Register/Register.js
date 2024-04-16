// Import necessary libraries and components
import React, { useState } from "react";

// Functional component for user registration
const Register = ({ loadUser, onRouteChange }) => {
  // State for storing the name, email, password, and passwordError
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let timeoutId; // Variable for storing the timeout ID

  // Function to update the name state when the name input changes
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to update the email state when the email input changes
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to update the password state and validate the password when the password input changes
  const onPasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    clearTimeout(timeoutId);

    const validateAndSetError = () => {
      if (!validatePassword(newPassword)) {
        setPasswordError(
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one of the following special characters: #$!%*?&"
        );
      } else {
        setPasswordError(" ");
      }
    };
    timeoutId = setTimeout(validateAndSetError, 5000);
  };

  // Function to validate the password using a regular expression
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$!%*?&])[A-Za-z\d#$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to submit the registration form
  const onSubmitSignIn = (event) => {
    event.preventDefault();
    if (validatePassword(password)) {
      fetch("https://smartbrainapi-ihb3.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error registering user.");
          }
        })
        .then((user) => {
          if (user.id) {
            loadUser(user);
            onRouteChange("home");
          }
        })
        .catch((error) => {
          console.error("Error registering user:", error.message);
        });
    } else {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one of the following special characters: #$!%*?&"
      );
    }
  };

  // Return the registration form JSX
  return (
    <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 shadow-5">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onNameChange}
              />
            </div>
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
              {passwordError && (
                <div style={{ color: "red" }}>
                  <p>{passwordError}</p>
                </div>
              )}
            </div>
          </fieldset>
          <div className="">
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              onClick={onSubmitSignIn}
            >
              Register
            </button>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register; // Export the Register component
