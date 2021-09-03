import React, { useState, useEffect } from "react";
import "../Slide.css";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    roll: "",
    dept: "",
    year: "",
  });

  const { name, email, password, roll, dept, year } = formData;

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  if (signUpButton) {
    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
  }

  if (signInButton) {
    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="body">
      <h1 style={{ textAlign: "center", fontWeight: "700", fontSize: "55" }}>
        <b>Student Login</b>
      </h1>

      <div className="container" id="container" style={{ height: "575px" }}>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={roll}
              name="roll"
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder="Department"
              value={dept}
              name="dept"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder="Year Of Joining"
              value={year}
              name="year"
              onChange={(e) => onChange(e)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => onChange(e)}
            />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already have an account!</h1>
              <p>Please login to access your profile</p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <p>Go ahead and create an account for yourself!!</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
