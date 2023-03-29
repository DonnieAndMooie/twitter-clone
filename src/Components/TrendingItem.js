import React from 'react'

export default function TrendingItem({name, numTweets}) {
  return (
    <div className='trending-item'>
        <p>Trending in United Kingdom</p>
        <p><strong>{name}</strong></p>
        <p>{numTweets} Tweets</p>
    </div>
  )
}
