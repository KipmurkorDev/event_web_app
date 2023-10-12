import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import MyEvents from './pages/MyEvents/MyEvents';
import ExploreEvents from './pages/ExploreEvents/ExploreEvents';
import Navbar from './components/Navbar/Navbar';
import CreateEvents from './pages/CreateEvents/CreateEvents';
// import './App.css'

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/explore" element={<ExploreEvents />} />
        <Route path="/createevents" element={<CreateEvents />} />
      </Routes>
    </>
  )
}

export default App
