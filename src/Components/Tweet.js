import React, { useEffect, useState } from 'react'
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import {query, collection, onSnapshot, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../Firebase';

export default function Tweet({text, author, id, numReplies, currentUser, numLikes, numRetweets, originalID, reply}) {
  const navigate = useNavigate()
  const [authorID, setAuthorID] = useState()
  const [liked, setLiked] = useState(false)
  const [retweeted, setRetweeted] = useState(false)

  useEffect(() => {

    //Find authors ID by finding matching username
    async function fetchUserID(){
      const q = query(collection(db, "users"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          const id = change.doc.id
          const user = change.doc.data()
          if (user.username === author.username){
            setAuthorID(id)
          }
        })
      })
    }
    fetchUserID()
  }, [author.username])

  useEffect(() => {
    async function checkIfLiked(){
      const docRef = doc(db, "tweets", originalID ? originalID : id)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      //Check if tweet has been like previously
      if (data.likes && data.likes.includes(currentUser.uid)){
        setLiked(true)
      }
      else{
        setLiked(false)
      }
    }
    async function checkIfRetweeted(){
      const docRef = doc(db, "tweets", originalID ? originalID : id)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      //Check if tweet has been retweeted previously
      if (data.retweets && data.retweets.includes(currentUser.uid)){
        setRetweeted(true)
      }
    }
    

    //Don't run this if the tweet is a reply
    if(!reply){
      checkIfLiked()
      checkIfRetweeted()
    }
    
  },[currentUser, id, originalID, reply])
  
  


  let profilePic

  //Set profile pic to google profile pic or default icon
  
  if (author.picture){
    profilePic = <img src={author.picture} alt="Profile" onClick={e => profileClickHandler(e)}/>
  }
  else{
    profilePic = <AccountCircleIcon className='profile-pic' onClick={e => profileClickHandler(e)}></AccountCircleIcon>
  }


  function clickHandler(){
    if (originalID){
      navigate(`/${originalID}`)
    }
    else{
      navigate(`/${id}`)
    }
    
  } 


  

  function profileClickHandler(e){
    e.stopPropagation()
    navigate(`/${authorID}`)
  }

  async function likeHandler(e){
    e.stopPropagation()
    const docRef = doc(db, "tweets", originalID ? originalID : id)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()

    //If liked previously, remove like
    if (data.likes && data.likes.includes(currentUser.uid)){
      await updateDoc(docRef, {
        likes: arrayRemove(currentUser.uid)
      }, {merge: true})
      setLiked(false)
    }

    //If not liked, add like
    else{
      await updateDoc(docRef, {
        likes: arrayUnion(currentUser.uid)
      }, {merge: true})
      setLiked(true)
    } 
  }

  async function retweetHandler(e){
    e.stopPropagation()
    const docRef = doc(db, "tweets", originalID ? originalID : id)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()

    //Add retweet
    await updateDoc(docRef, {
      retweets: arrayUnion(currentUser.uid)
    }, {merge: true})
      setRetweeted(true)
    } 



  return (
    <div className='tweet-item' onClick={clickHandler} id={id}>
        {profilePic}
        <div className="author">
          <p className='name'>{author.name}</p>
          <p className='username'>@{author.username}</p>
        </div>
        <p className='text'>{text}</p>
        <div className="tweet-icons">
          <div className="comment">
          <img src={Comment} alt="Comment" className='comment'/>
          <p className='num-replies'>{numReplies}</p>
        </div>
        <div className="retweet" onClick={reply ? null : retweetHandler}>
          <img src={Retweet} alt="Retweet" className={retweeted ? "retweeted" : ""}/>
          <p className='num-retweets'>{numRetweets}</p>
        </div>
          <div className="like" onClick={reply ? null : (e) => likeHandler(e)}>
            <FavoriteBorderIcon className={liked ? "liked" : ""}></FavoriteBorderIcon>
            <p className='num-likes'>{numLikes}</p>
          </div>

        </div>
    </div>
  )
}
