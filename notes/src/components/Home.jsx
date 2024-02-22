import "./styles/home.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
function Home() {
  let navigate = useNavigate();

    function goNotes(){
      navigate("/newNote")
    }

  return (
    <>
      <div className="header">
        <div className="title">
          <p className="big">NOTES</p>
          <p>Bienvenido a la aplicación para crear notas</p>
          <div className="btn">
          <button onClick={goNotes}>Create a Note</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
