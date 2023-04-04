import React from 'react';
import Sidebar from './Sidebar';
import RightWidgets from './RightWidgets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Comment from '../images/comment.png'
import Retweet from '../images/retweet.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

export default function TweetPage({tweet, currentUser}) {
  console.log(currentUser)

  let profilePic
  if (tweet.author.picture){
    profilePic = <img src={tweet.author.picture} alt="Profile" className='profile-pic' />
  }
  else{
    profilePic = <AccountCircleIcon className='profile-pic'></AccountCircleIcon>
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
            {profilePic}
            <input type="text" placeholder='Tweet your reply' />
            <button className="tweet reply-btn">Reply</button>
          </div>
        </div>
        <RightWidgets></RightWidgets>
    </div>
    
  )
}
