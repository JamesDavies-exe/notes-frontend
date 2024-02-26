import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/myNotes.css";

function MyNotes() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [tieneToken, setTieneToken] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token existe en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setTieneToken(true);
    } else {
      setTieneToken(false);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let notes = [];
        response.forEach(element => {
            let noteDetails = {
              id: element.id,
              label: element.title
            }
            notes.push(noteDetails);
        });
        setNotes(notes);
      })
      .catch((error) => {
          console.log(error)
      });
  }, []);

  useEffect(() => {
    console.log("doing search")
    const filteredNotes = [];
    notes.forEach(note => {
      if (note.label.toLowerCase().includes(search.toLowerCase())) {
        filteredNotes.push(note);
      }
    })
    setFilteredNotes(filteredNotes);
  }, [search]);

  if(!tieneToken){
    return (
      <>
      <div className="error-card">
        <p>Login with your account to see your notes</p>
      </div>
      </>
    )
  }
  return (
    <>
    <div className="searchDiv">
      <button>Sort by date</button>
    <input type="text" id="search" value={search} placeholder="Search by title" onChange={(event) => setSearch(event.target.value)} />
    </div>
    {filteredNotes.map((note) => 
      <div onClick={() => navigate("/showNote/" + note.id)} key={note.id} className='note-card'>
        <p>{note.label}</p>
      </div>
    )}
    </>
  );
}

export default MyNotes;
