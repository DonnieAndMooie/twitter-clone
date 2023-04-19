import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { setDoc, doc } from "firebase/firestore"
import { db } from '../Firebase';

export default function SignUp({submitMock}) {
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

    //Create new account
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        setSignedUp(true)
        await setDoc(doc(db, "users", user.uid), {
          name: document.getElementById("name").value,
          username: document.getElementById("username").value.replace(/\s/g, ''),
       })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(`An error occurred ${errorCode} - ${errorMessage}`)
      })
  }


  //Redirect to login page when account created
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
          <form action="" className='sign-up-form' onSubmit={submitMock ? submitMock : (e) => submitHandler(e)}>
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
