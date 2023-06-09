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
  const [displayedUserID, setDisplayedUserID] = useState()

  useEffect(() => {
    //Fetch ID of user to be displayed by matching username
    async function fetchID(){
      const q = query(collection(db, "users"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          const id = change.doc.id
          const currentUser = change.doc.data()
          if (user.username === currentUser.username){
            setDisplayedUserID(id)
          }
        })
      })
    }
    fetchID()
  }, [user])

  useEffect(() => {
    //Fetch all tweets by user
    async function fetchTweets(){
      const q = query(collection(db, "tweets"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          if (change.type === "modified"){
            return false
          }
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
    const tweetElement = <Tweet key={id}text={tweet.text}
    author={tweet.author}
    id={id}
    currentUser={currentUser}
    numLikes={tweet.likes ? tweet.likes.length : 0}
    numReplies={tweet.replies ? tweet.replies.length : 0}
    numRetweets={tweet.retweets ? tweet.retweets.length : 0}></Tweet>
    setTweets(prevTweets => {
      return [tweetElement, ...prevTweets]
    })
  }


  //Set profile pic
  let profilePic
  if (user.picture){
    profilePic = <img className='tweet-page-profile-pic' src={user.picture} alt="Profile" />
  }
  else{
    profilePic = <AccountCircleIcon className='tweet-page-profile-pic'></AccountCircleIcon>
  }

  let button
  //If viewing own profile show different button text
  if (currentUser.uid === displayedUserID){
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
