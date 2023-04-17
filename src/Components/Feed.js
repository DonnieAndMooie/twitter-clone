import { collection, getDoc, onSnapshot, query, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Tweetbox from './Tweetbox'
import { db } from '../Firebase'
import Tweet from './Tweet'
import { Navigate } from 'react-router-dom'
import Retweet from './Retweet'

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
            if (likesElement){
              likesElement.textContent = tweet.likes ? tweet.likes.length : "0"
            }
            const retweetsElement = document.querySelector(`#${id} .num-retweets`)
            if (retweetsElement){
              retweetsElement.textContent = tweet.retweets ? tweet.retweets.length : "0"
            }
            const tweetPageRepliesElement = document.querySelector(".selected-tweet .comment p")
            if (tweetPageRepliesElement){
              tweetPageRepliesElement.textContent = tweet.replies.length
            }
            
            if (tweet.retweets && 
                !document.querySelector(`#${id}-${currentUser.uid}`) &&
                tweet.retweets[tweet.retweets.length - 1] === currentUser.uid){
              displayRetweet(tweet, id, currentUser.uid)
            }
            return
          }
          displayTweet(tweet, id)
          if (tweet.retweets){
            tweet.retweets.forEach((retweet) => displayRetweet(tweet, id, retweet))
          }
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
    numRetweets={tweet.retweets ? tweet.retweets.length : 0}
    ></Tweet>
    setTweets(prevTweets => {
      return [tweetElement, ...prevTweets]
    })
  } 

  async function displayRetweet(tweet, id, retweet){
      const name = await findUser(retweet)
      const retweetID = `${id}-${retweet}`
      const text = tweet.text
      const author = tweet.author
      const numReplies= tweet.replies ? tweet.replies.length : 0
      const numLikes= tweet.likes ? tweet.likes.length : 0
      const numRetweets= tweet.retweets ? tweet.retweets.length : 0
      const retweetElement = <Retweet key={retweetID} name={name} retweetID={retweetID} text={text} author={author} numReplies={numReplies} numLikes={numLikes} numRetweets={numRetweets} currentUser={currentUser} originalID={id}></Retweet>
      setTweets(prevTweets => {
        return [retweetElement, ...prevTweets]
      })
    }
  

  async function findUser(user){
    try{
      const docSnap = await getDoc(doc(db, "users", user))
      const data = docSnap.data()
      const name = data.name
      return name
    }
    catch{
      console.error("error")
    }
    
    
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
