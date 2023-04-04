import React, { useEffect, useState } from 'react'
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import {query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

export default function Tweet({text, author, id}) {
  const navigate = useNavigate()
  const [authorID, setAuthorID] = useState()

  useEffect(() => {
    fetchUserID()
  }, [])
  

  let profilePic
  if (author.picture){
    profilePic = <img src={author.picture} alt="Profile" onClick={e => profileClickHandler(e)}/>
  }
  else{
    profilePic = <AccountCircleIcon className='profile-pic' onClick={e => profileClickHandler(e)}></AccountCircleIcon>
  }

  function clickHandler(){
    navigate(`/${id}`)
  } 


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

  function profileClickHandler(e){
    e.stopPropagation()
    navigate(`/${authorID}`)
  }

  return (
    <div className='tweet-item' onClick={clickHandler}>
        {profilePic}
        <div className="author">
          <p className='name'>{author.name}</p>
          <p className='username'>@{author.username}</p>
        </div>
        <p className='text'>{text}</p>
        <div className="tweet-icons">
          <img src={Comment} alt="Comment" className='comment'/>
          <img src={Retweet} alt="Retweet" className='retweet'/>
          <FavoriteBorderIcon className='like'></FavoriteBorderIcon>
        </div>
    </div>
  )
}
