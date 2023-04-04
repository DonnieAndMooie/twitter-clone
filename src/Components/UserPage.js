import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import RightWidgets from './RightWidgets'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { query, collection, onSnapshot} from 'firebase/firestore';
import { db } from '../Firebase';
import Tweet from './Tweet'

export default function UserPage({user, currentUser}) {

  const [tweets, setTweets] = useState([])

  useEffect(() => {
    async function fetchTweets(){
      const q = query(collection(db, "tweets"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          const id = change.doc.id
          const tweet = change.doc.data()
          if (tweet.author.username === user.username){
            displayTweet(tweet, id)
          }
          
        })
      })

    }
    fetchTweets()
  }, [user])

  function displayTweet(tweet, id){
    const tweetElement = <Tweet key={id}text={tweet.text} author={tweet.author} id={id}></Tweet>
    setTweets(prevTweets => {
      return [tweetElement, ...prevTweets]
    })
  }

  let profilePic
  if (user.picture){
    profilePic = <img className='tweet-page-profile-pic' src={user.picture} alt="Profile" />
  }
  else{
    profilePic = <AccountCircleIcon className='tweet-page-profile-pic'></AccountCircleIcon>
  }

  let button
  if (currentUser.username === user.username){
    button = <button className="follow">Set up profile</button>
  }
  else{
    button = <button className="follow">Follow</button>
  }

  return (
    <div className="home">
        <Sidebar currentUser={currentUser}></Sidebar>
        <div className="user-page">
            <div className="tweet-page-header">
                <h2 className='back-arrow'><Link to={"/dashboard"}>🡸</Link></h2>
                <h2>{user.name}</h2>
          </div>
          <div className="banner"></div>
          <div className="pic-btn-div">
            {profilePic}
            {button}
          </div>
          <div className="user-details">
          <p className="name"><strong>{user.name}</strong></p>
            <p className='username'>@{user.username}</p>
            <p className='following'><strong>0</strong> Following</p>
            <p className='followers'><strong>0</strong> Followers</p>
          </div>
          <div className="tab-container">
            <p className='selected'><strong>Tweets</strong></p>
            <p>Replies</p>
            <p>Media</p>
            <p>Likes</p>
          </div>
          {tweets}
        </div>
        <RightWidgets></RightWidgets>
    </div>
  )
}
