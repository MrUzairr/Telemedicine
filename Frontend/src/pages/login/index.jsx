import React, { useState } from "react";
import "./index.css";
import GoogleLogin from '../../components/googleLogin/index';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<GoogleLogin></GoogleLogin>
		</GoogleOAuthProvider>
	)
  // Update handleRegister to prevent default form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const user = {
      email,
      password,
    };
    console.log(user)

    try {
      const response = await fetch("http://localhost:3005/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      console.log(result); // Log the result from the API
      if(result){
        window.location.href = "/"
      }
    } catch (error) {
      console.log(error); // Log any error
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-data">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleLogin} className="reg-form">
          <label className="reg-labels" htmlFor="email">
            Email*
          </label>
          <input
            className="reg-inputs form-control"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          <label className="reg-labels" htmlFor="password">
            Password*
          </label>
          <input
            className="reg-inputs form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          <button type="submit" className="reg-submit">
            Login
          </button>
          <GoogleWrapper/>
          <div className="reg-create-account">
          <a className="create-account" href="/signup">create new account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

