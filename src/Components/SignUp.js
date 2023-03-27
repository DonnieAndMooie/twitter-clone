import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const [signedUp, setSignedUp] = useState(false)

  function checkPasswordsMatch(){
    const password = document.getElementById("password")
    const confirm = document.getElementById("confirm-password")
    if (password.value === confirm.value){
      confirm.setCustomValidity("")
    }
    else{
      confirm.setCustomValidity("Passwords do not match")
    }
  }

  function submitHandler(e){
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log("Account created")
        console.log(user)
        setSignedUp(true)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(`An error occurred ${errorCode} - ${errorMessage}`)
      })
  }


  if (signedUp){
    return(
      <Navigate to={"/"}></Navigate>
    )
  }
  else{
    return (
      <div className='sign-up-page'>
        <div className="sign-up-div">
          <TwitterIcon className="twitter"></TwitterIcon>
        <h1>Create your account</h1>
          <form action="" className='sign-up-form' onSubmit={(e) => submitHandler(e)}>
            <input type="text" placeholder='Name' name="name" id="name"/>
            <input type="text" placeholder='Username' name="username" id="username"/>
            <input type="text" placeholder='Email' name="email" id="email"/>
            <input type="password" placeholder='Password' name="password" id="password" onChange={checkPasswordsMatch}/>
            <input type="password" placeholder='Confirm Password' name="confirm-password" id="confirm-password" onChange={checkPasswordsMatch}/>
            <button type='submit' className='sign-up-btn'>Sign Up</button>
          </form>
          
        </div>
      </div>
    )
  }
  
}