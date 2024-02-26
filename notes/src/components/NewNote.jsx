import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/myNotes.css'

function NewNote(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [publicity, setPublicity] = useState(false);
    let navigate = useNavigate();
    const changeTitle = (event) => {setTitle(event.target.value)};
    const changeContent = (event) => {setContent(event.target.value)};
    const changeFile = (event) => {setFile(event.target.files[0])};
    const changePublicity = (event) => {setPublicity(event.target.value)};
    const [tieneToken, setTieneToken] = useState(false);

    useEffect(() => {
      // Verificar si el token existe en localStorage
      const token = localStorage.getItem('token');
      if (token) {
        setTieneToken(true);
      } else {
        setTieneToken(false);
      }
    }, []);

    const sendNote = async (event) => {
        event.preventDefault();
        const note = { title: title, body: content, isVoiceNote: false, isPublic: publicity }
        console.log(note);
        await post(note).then((id) => { if (file) uploadFile(id, file); })
            .then(navigate("/myNotes/"));
    }


    async function post(note) {
        return await fetch("http://localhost:8080/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(note),
        })
            .then((response) => {
                return response.json();
            }).then((data) => {
                return data.id;
            })
            .catch(() => {
                return "Error creating note";
            })
    }

    async function uploadFile(id, file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("http://localhost:8080/notes/" + id + "/files", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return await response.json();
    }

    if(!tieneToken){
      return (
        <>
        <div className="error-card">
          <p>Login with your account to create notes</p>
        </div>
        </>
      )
    }

    if(tieneToken){
      return(
        <>
        <div className="container" id="home">
        <div className="login-left">
          <div className="login-header">
            <h1>Create a note</h1>
          </div>
          <form onSubmit={sendNote} className="login-form" autoComplete="off">
            <div className="login-content">
              <div className="form-item">
                <label htmlFor="text">Title</label>
                <input
                    type="text"
                    placeholder="Note name"
                    onChange={changeTitle}
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
                    onChange={changeContent}
                    value={content}
                />
              </div>
              <div className="form-item">
                <label htmlFor="file">Upload file (optional)</label>
                <input 
                    id="file" 
                    type="file" 
                    accept="image/*" 
                    onChange={changeFile} 
                />
                <input type="checkbox"
                id="public"
                value={publicity}
                onChange={changePublicity}
                />
              </div>
              <button type="submit">Create note</button>
            </div>
          </form>
        </div>
      </div>
        </>
    )
    }
}

export default NewNote;