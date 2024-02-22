import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function NewNote(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    let navigate = useNavigate();
    const changeTitle = (event) => {setTitle(event.target.value)};
    const changeContent = (event) => {setContent(event.target.value)};
    const changeFile = (event) => {setFile(event.target.files[0])};

    const sendNote = async (event) => {
        event.preventDefault();
        const note = { title: title, body: content, isVoiceNote: false, isPublic: true }
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
              </div>
              <button type="submit">Create note</button>
            </div>
          </form>
        </div>
      </div>
        </>
    )
}

export default NewNote;