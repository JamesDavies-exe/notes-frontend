import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendSignUp = async (event) => {
    event.preventDefault();
    const data = { username: username, password: password };
    window.alert(String(await post(data)));
}

async function post(data) {
    return await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status === 409) return "User already exists";
            if (response.ok) return "User " + data.username + " created";
            return "Input data error";
        })
        .catch(() => {
            return "Error creating user";
        })
}

  return (
    <>
      <div className="container" id="home">
        <div className="login-left">
          <div className="login-header">
            <h1>Create an account</h1>
          </div>
          <form onSubmit={sendSignUp} className="login-form" autoComplete="off">
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
              <button type="submit">Create account</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
