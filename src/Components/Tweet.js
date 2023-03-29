import React from 'react'
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Tweet({text, author}) {
  let profilePic
  if (author.picture){
    profilePic = <img src={author.picture} alt="Profile" />
  }
  else{
    profilePic = <AccountCircleIcon className='profile-pic'></AccountCircleIcon>
  }

  return (
    <div className='tweet-item'>
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
