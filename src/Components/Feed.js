import React from 'react'
import Tweetbox from './Tweetbox'

export default function Feed({currentUser}) {
  return (
    <div className='feed'>
        <h2>Home</h2>
        <div className="tab-container">
            <p className='selected'><strong>For you</strong></p>
            <p>Following</p>
        </div>
        <Tweetbox currentUser={currentUser}></Tweetbox>
    </div>
  )
}
