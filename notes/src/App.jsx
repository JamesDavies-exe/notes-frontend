import { useState } from 'react'
import React from 'react';
import './App.css'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/SignUp.jsx'
import MyNotes from './components/MyNotes.jsx';
import NewNote from './components/NewNote.jsx';
import ShowNote from './components/ShowNote.jsx';
import ModifyNote from './components/ModifyNote.jsx';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
    <Router>
    <header id="header">
        <div className="logo"><Link to="/">Notes</Link> </div>
        <div className="hamburger" id="toggle">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <nav className="nav-bar" id="navbar">
            <ul>
                <li>
                    <Link to="/myNotes">My Notes</Link>
                </li>
                <li>
                  <Link to={"/newNote"}>New Note</Link>                
                  </li>
                <div className="login">
                    <li>
                        <Link to="/login" className="navlogin active">Login</Link>
                    </li>
                </div>
            </ul>
        </nav>
    </header>

      <Routes>
        <Route exact path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
        <Route path='/myNotes' Component={MyNotes}></Route>
        <Route path='/newNote' Component={NewNote}></Route>
        <Route path='/showNote/:id' Component={ShowNote}></Route>
        <Route path='/modifyNote/:id' Component={ModifyNote}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
