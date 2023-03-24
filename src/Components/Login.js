import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../Firebase'
import { useState } from 'react';
import Homepage from './Homepage';

export default function Login() {
  const [signedIn, setSignedIn] = useState(false)
  const  [currentUser, setCurrentUser] = useState()

  function googleSignIn(){
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken

      const user = result.user
      console.log("signed in")
      console.log(user)
      setSignedIn(true)
      setCurrentUser(user)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`An error occurred: ${errorCode} - ${errorMessage}`)
    })
  }
  
  if (signedIn){
    return(
      <Homepage></Homepage>
    )
  }

  return (
    <div className='login-page'>
        <div className="login">
        <TwitterIcon className='twitter' ></TwitterIcon>
        <h2>Sign in to Twitter</h2>
        <div className="google-sign-in" onClick={googleSignIn}>
          <GoogleIcon className='google'></GoogleIcon>
          Sign in with Google
          </div>
          <div className="or">
            <hr />
            <p>or</p>
            <hr />
          </div>
          <input type="text" placeholder='Email'/>
          <input type="password" placeholder='Password' />
          <button className='sign-in' type='submit'>Sign In</button>
          <p className='sign-up'>Don't have an account? <a href="/">Sign Up</a></p>
        </div>
        
    </div>
  )
}
