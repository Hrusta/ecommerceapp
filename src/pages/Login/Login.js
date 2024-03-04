import React, { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/ecommerceapp");
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="formL">
      <form onSubmit={handleSubmit}>
        <div className="h1L">
          <h1>Login</h1>
        </div>
        <div className="input-container">
          <label>Email </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="button-container">
          <button className="button-6" type="submit">
            Log in
          </button>
        </div>
        <p>
          <Link to="/ecommerceapp/register">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
