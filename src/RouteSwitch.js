import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import Homepage from './Components/Homepage'
import SignUp from './Components/SignUp'

export default function RouteSwitch() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/dashboard" element={<Homepage />}></Route>
            
        </Routes>
    </BrowserRouter>
  )
}
