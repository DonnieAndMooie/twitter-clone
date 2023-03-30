import React from 'react'
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function Tweet({text, author, id}) {
  const navigate = useNavigate()

  let profilePic
  if (author.picture){
    profilePic = <img src={author.picture} alt="Profile" />
  }
  else{
    profilePic = <AccountCircleIcon className='profile-pic'></AccountCircleIcon>
  }

  function clickHandler(){
    
    navigate(`/${id}`)
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
