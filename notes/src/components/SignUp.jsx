
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/signup.css";
function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const makeFetch = (event) => {
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409) {
            console.log("Este usuario ya existe");
            return;
          }
          throw new Error("Signup ha fallado");
        }
        console.log("Sign up successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="card">
        <div className="form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              name="user"
              onChange={(event) => setUsername(event.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={makeFetch}>Sign Up</button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
