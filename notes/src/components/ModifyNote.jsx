import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function ModifyNote() {
  const [tieneToken, setTieneToken] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        console.log(response)
        setTitle(response.title);
        setContent(response.body)
      })
      .catch((error) => {
          console.log(error)
      });
  }, []);

  const modifyNote = async (event) => {
    event.preventDefault();
    const note = { title: title, body: content, isVoiceNote: false, isPublic: true }
    await post(note)
        .then(navigate("/myNotes"));
}
async function post(note) {
    return await fetch("http://localhost:8080/notes/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(note),
    })
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            return "Error modifying note";
        })
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

  if(tieneToken){
    return (
        <>
        <div className="container" id="home">
        <div className="login-left">
          <div className="login-header">
            <h1>Modify note</h1>
          </div>
          <form onSubmit={modifyNote} className="login-form" autoComplete="off">
            <div className="login-content">
              <div className="form-item">
                <label htmlFor="text">Title</label>
                <input
                    type="text"
                    placeholder="Note name"
                    onChange={(event) => setTitle(event.target.value)}
                    required value={title}
                />
              </div>
              <div className="form-item">
                <label htmlFor="content">Note content</label>
                <textarea 
                    id="content" 
                    placeholder="Content" 
                    rows="3" 
                    cols={20}
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
              </div>
              <button type="submit">Modify Note</button>
            </div>
          </form>
        </div>
      </div>
        </>
    )
  }
}

export default ModifyNote;