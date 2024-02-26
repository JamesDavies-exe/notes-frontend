import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const sendLogin = async (event) => {
    event.preventDefault();
    const data = { username: username, password: password };
    postLogin(data);
  };

  async function postLogin(data) {
    await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("username", username);
        window.dispatchEvent(new Event("storage"));
        return navigate("/");
      })
      .catch(() => {
        window.alert("Wrong username or password");
      });
  }
  return (
    <>
      <div className="container" id="home">
        <div className="login-left">
          <div className="login-header">
            <h1>Log in</h1>
            <p>
              <Link to="/register">Or sign up if you don't have account</Link>
            </p>
          </div>
          <form onSubmit={sendLogin} className="login-form" autoComplete="off">
            <div className="login-content">
              <div className="form-item">
                <label htmlFor="text">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  name="username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
