import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  return (
    <div className='login-page'>
        <div className="login">
        <TwitterIcon className='twitter' ></TwitterIcon>
        <h2>Sign in to Twitter</h2>
        <div className="google-sign-in">
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
