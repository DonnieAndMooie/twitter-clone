import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import Homepage from './Components/Homepage'
import SignUp from './Components/SignUp'
import { useState } from 'react'

export default function RouteSwitch() {
  const  [currentUser, setCurrentUser] = useState()

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App setCurrentUser={setCurrentUser}/>}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/dashboard" element={<Homepage currentUser={currentUser}/>}></Route>
            
        </Routes>
    </BrowserRouter>
  )
}
