import React from 'react';
import Sidebar from './Sidebar';
import RightWidgets from './RightWidgets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { useEffect, useState } from 'react';
import Tweet from './Tweet';

export default function TweetPage({tweet, currentUser}) {
  const [userData, setUserData] = useState()
  const [replies, setReplies] = useState([])
  const id = getCurrentURL().split("/").pop()

  useEffect(() => {
    async function getData(){
      const userInfo = await getDoc(doc(db, "users", currentUser.uid))
      const data = userInfo.data()
      setUserData(data)
    }
    getData()
  }, [currentUser])

  useEffect(() => {
    async function fetchReplies(){
      const unsub = onSnapshot(doc(db, "tweets", id), (doc) =>{
        setReplies([])
        const replies = doc.data().replies
        if (replies){
          replies.forEach((reply, i) => {
            displayReply(reply, i)
          })
        }
      })
      
      

    }
    fetchReplies()
  }, [id])

  function displayReply(tweet, i){
    const tweetElement = <Tweet key={i}text={tweet.text} author={tweet.author} id={id}></Tweet>
    setReplies(prevReplies => {
      return [tweetElement, ...prevReplies]
    })
  }

  let profilePic
  if (tweet.author.picture){
    profilePic = <img src={tweet.author.picture} alt="Profile" className='profile-pic' />
  }
  else{
    profilePic = <AccountCircleIcon className='profile-pic'></AccountCircleIcon>
  }

  

  async function tweetHandler(){
    const input = document.getElementById("reply-input")
    const inputValue = document.getElementById("reply-input").value
    if (inputValue === ""){
      return
    }
    else{
      input.value = ""
      await updateDoc(doc(db, "tweets", id), {
        replies: arrayUnion(
          {author: userData,
          text: inputValue
        })
          
      }, {merge: true})
  }
    }
    

  function getCurrentURL(){
    return window.location.href
  }

  return (
    <div className='home'>
        <Sidebar currentUser={currentUser}></Sidebar>
        <div className='tweet-page'>
          <div className="tweet-page-header">
            <h2 className='back-arrow'><Link to={"/dashboard"}>🡸</Link></h2>
            <h2>Tweet</h2>
          </div>
          <div className='selected-tweet'>
          {profilePic}
          <div className="author">
            <div>
              <p className='name'>{tweet.author.name}</p>
              <p className='username'>@{tweet.author.username}</p>
            </div>
          </div>
          <p className='text'>{tweet.text}</p>
            <div className="tweet-icons">
              <img src={Comment} alt="Comment" className='comment'/>
              <img src={Retweet} alt="Retweet" className='retweet'/>
              <FavoriteBorderIcon className='like'></FavoriteBorderIcon>
            </div>
          </div>
          <div className="reply-box">
          {userData && userData.picture ? <img src={userData.picture} alt="Profile" className='profile-pic'/> : <AccountCircleIcon className="profile-pic"/>}
            <input type="text" placeholder='Tweet your reply' id='reply-input'/>
            <button className="tweet reply-btn" onClick={tweetHandler}>Reply</button>
          </div>
          {replies}
        </div>
        <RightWidgets></RightWidgets>
    </div>
    
  )
}
