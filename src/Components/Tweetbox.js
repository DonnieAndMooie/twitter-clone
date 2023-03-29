import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getDoc, collection, doc, addDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import BallotIcon from '@mui/icons-material/Ballot';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Tweetbox({currentUser}) {
const [userData, setUserData] = useState()

  useEffect(() => {
    async function getData(){
      const userInfo = await getDoc(doc(db, "users", currentUser.uid))
      const data = userInfo.data()
      setUserData(data)
    }
    getData()
  }, [])

  async function tweetHandler(){
    const tweetbox = document.getElementById("tweet-input")
    const tweet = tweetbox.value
    if (tweet === ""){
        return
    }
    else{
        tweetbox.value = ""
        await addDoc(collection(db, "tweets"), {
            text: tweet,
            author: userData
        })
    }
  }

  return (
    <div className='tweetbox'>
        {userData && userData.picture ? <img src={userData.picture} alt="Profile"/> : <AccountCircleIcon className="account-circle"/>}
        <input type="text" id="tweet-input" maxLength={280} placeholder="What's Happening?"/>
        <div className="icons">
            <ImageIcon></ImageIcon>
            <GifIcon></GifIcon>
            <BallotIcon></BallotIcon>
            <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
            <CalendarTodayIcon></CalendarTodayIcon>
            <LocationOnIcon></LocationOnIcon>
            <button className="tweetbox-tweetbtn" onClick={tweetHandler}>Tweet</button>
        </div>
    </div>
  )
}
