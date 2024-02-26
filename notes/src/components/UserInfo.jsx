import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/myNotes.css";

function UserInfo() {
  const [tieneToken, setTieneToken] = useState(false);
  const [username, setUsername] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setTieneToken(true);
      setUsername(localStorage.getItem("username"));
    } else {
      setTieneToken(false);
    }
  }, []);

  const changePassword = async (event) => {
    event.preventDefault();
    const data = { oldPassword: actualPassword, newPassword: newPassword };
    putPassword(data);
  };

  async function putPassword(data) {
    await fetch("http://localhost:8080/changepassword", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .catch(() => {
        setMessage("Contraseña cambiada correctamente");
      });
  }

  if (!tieneToken) {
    return (
      <>
        <div className="error-page">
          <p>Acces denied! Login and try again</p>
        </div>
      </>
    );
  }

  if (tieneToken) {
    return (
      <>
        <h1>Change {username} password</h1>
        <h3>{message}</h3>
        <form onSubmit={changePassword}>
          <input
            type="password"
            placeholder="Actual password"
            value={actualPassword}
            onChange={(event) => setActualPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button type="submit">Change password</button>
        </form>
      </>
    );
  }
}

export default UserInfo;
