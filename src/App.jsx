import React from 'react'
import './index.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.tsx'
import { About } from './pages/about.tsx'
import Navbar from './components/Navbar.jsx'
import ProfileCompletion from './components/ProfileCompletion/ProfileCompletion.tsx'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile-completion' element={<ProfileCompletion />} />
      </Routes>

    </>
  )
}

export default App
