import { useState } from 'react'
import React from 'react';
import './App.css'
import Home from './components/Home.jsx'
import SignUp from './components/SignUp.jsx'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
    <Router>
    <nav className="nav">
        <div className="nav__title">
          <Link to="/">NOTES</Link>
        </div>
        <ul className="nav__list">
          <li className="nav__item">
          <Link to="/login">Login</Link>
          </li>
          <li className="nav__item">
          <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path='/' Component={Home} />
        <Route path='/register' Component={SignUp} />
      </Routes>
    </Router>
    </>
  )
}

export default App
