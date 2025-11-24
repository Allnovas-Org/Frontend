import React from 'react'
import './index.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.tsx'
import { About } from './pages/about.tsx'
import Navbar from './components/Navbar.jsx'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>

    </>
  )
}

export default App
