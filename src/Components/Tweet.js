import React from 'react'
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function Tweet({text, author}) {
  return (
    <div className='tweet-item'>
        <img src={author.picture} alt="Profile" />
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
