import React from 'react'
import TrendingItem from './TrendingItem'

export default function RightWidgets() {
  return (
    <div className='right-widgets'>
        <input type="text"  className='serch' placeholder='Search Twitter'/>
        <div className="whats-happening">
            <h2>What's happening</h2>
            <TrendingItem name={"Liverpool"} numTweets="27.4K"></TrendingItem>
            <TrendingItem name={"Salah"} numTweets="17.2K"></TrendingItem>
            <TrendingItem name={"Coldplay"} numTweets="7.4K"></TrendingItem>
            <TrendingItem name={"Boris"} numTweets="37.4K"></TrendingItem>
            <TrendingItem name={"Twitter"} numTweets="2.4K"></TrendingItem>
        </div>
    </div>
  )
}
