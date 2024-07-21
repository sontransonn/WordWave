import React from 'react'

import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App