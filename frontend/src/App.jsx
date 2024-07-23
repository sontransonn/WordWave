import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from './pages/home/Home';
import BlogDetail from './pages/blogDetail/BlogDetail';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App