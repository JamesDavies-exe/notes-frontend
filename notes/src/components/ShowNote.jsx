import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/myNotes.css";

function ShowNote() {
  const [tieneToken, setTieneToken] = useState(false);
  const [note, setNote] = useState({});
  const [fileUri, setFileUri] = useState("");
  const [fileSrc, setFileSrc] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setTieneToken(true);
    } else {
      setTieneToken(false);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/notes/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNote(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/notes/" + id + "/files", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response[0].uri)
        fetch("http://localhost:8080" + response[0].uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.blob())
        .then((response) => {
          console.log(response);
          setFileSrc(URL.createObjectURL(response));
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
 
  function deleteNote() {
    fetch("http://localhost:8080/notes/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/myNotes");
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
  return (
    <>
      <div className="showNote">
        <h1>{note.title}</h1>
        <p>{note.body}</p>
        <p>Body: {note.body}</p>
        <p>Create date: {note.createdAt}</p>
        {fileSrc == null ? "" : <img className="image" src={fileSrc} alt=""/>}
      </div>
      <button onClick={() => navigate("/modifyNote/" + note.id)}>Modify</button>
      <button onClick={deleteNote}>Delete</button>
    </>
  );
}

export default ShowNote;