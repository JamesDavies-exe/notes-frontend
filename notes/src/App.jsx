import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <>
    <Navbar></Navbar>
    <div className='header'>
      <div className='title'>
        <p className='big'>NOTES</p>
        <p>(James Davies)</p>
      </div>
    </div>
    </>
  )
}

export default App
