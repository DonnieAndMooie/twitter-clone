import React from 'react'
import Tweet from './Tweet'
import RetweetIcon from '../images/retweet.png'

export default function Retweet({name, retweetID, text, author, numReplies, numLikes, numRetweets, currentUser, originalID}) {
  return (
    <div>
        <div className='retweet-div'>
        <img src={RetweetIcon} alt="Retweet" />
        <p>{name} Retweeted</p>
        </div>
        <Tweet text={text} author={author} numReplies={numReplies} currentUser={currentUser} numLikes={numLikes} numRetweets={numRetweets} id={retweetID} originalID={originalID}></Tweet>
    </div>
    
  )
}
