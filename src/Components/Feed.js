import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Tweetbox from './Tweetbox'
import { db } from '../Firebase'
import Tweet from './Tweet'
import { Navigate } from 'react-router-dom'

export default function Feed({currentUser}) {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    async function fetchTweets(){
      const q = query(collection(db, "tweets"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          const id = change.doc.id
          const tweet = change.doc.data()
          if (change.type === "modified"){
            const likesElement = document.querySelector(`#${id} .num-likes`)
            likesElement.textContent = tweet.likes.length

            return
          }
          displayTweet(tweet, id)
        })
      })

    }
    fetchTweets()
  }, [])
  
  function displayTweet(tweet, id){
    const tweetElement = <Tweet key={id}text={tweet.text}
    author={tweet.author}
    id={id}
    numReplies={tweet.replies ? tweet.replies.length : 0}
    currentUser={currentUser}
    numLikes={tweet.likes ? tweet.likes.length : 0}
    ></Tweet>
    setTweets(prevTweets => {
      return [tweetElement, ...prevTweets]
    })
  } 

  return (
    <div className='feed'>
        <h2>Home</h2>
        <div className="tab-container">
            <p className='selected'><strong>For you</strong></p>
            <p>Following</p>
        </div>
        <Tweetbox currentUser={currentUser}></Tweetbox>
        <div className="tweets-div">
          {tweets}
        </div>
    </div>
  )
}
