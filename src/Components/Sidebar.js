import React from 'react'
import SidebarItem from './SidebarItem';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home'; 
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect } from 'react';
import { db } from '../Firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({currentUser}) {
  const [userData, setUserData ] = useState()
  const navigate = useNavigate()

  function clickHandler(){
    
    navigate(`/${currentUser.uid}`)
  } 

  useEffect(() => {
    async function getData(){
      const userInfo = await getDoc(doc(db, "users", currentUser.uid))
      const data = userInfo.data()
      setUserData(data)
    }
    getData()
  }, [currentUser])

  return (
    <div className='sidebar'>
      <TwitterIcon className='twitter'></TwitterIcon>
      <SidebarItem Icon={HomeIcon} text="Home" selected={true}></SidebarItem>
      <SidebarItem Icon={TagIcon} text="Explore"></SidebarItem>
      <SidebarItem Icon={NotificationsNoneIcon} text="Notifications"></SidebarItem>
      <SidebarItem Icon={MailOutlineIcon} text="Messages"></SidebarItem>
      <SidebarItem Icon={BookmarkBorderIcon} text="Bookmarks"></SidebarItem>
      <SidebarItem Icon={TwitterIcon} text="Twitter Blue"></SidebarItem>
      <SidebarItem Icon={PermIdentityIcon} text="Profile"></SidebarItem>
      <SidebarItem Icon={MoreHorizIcon} text="More"></SidebarItem>
      <button className="tweet">Tweet</button>
      
      <div className="user" onClick={clickHandler}>
        {userData && userData.picture ? <img src={userData.picture} alt="Profile"/> : <AccountCircleIcon className="account-circle"/>}
        <p className='name'>{userData ? userData.name : ""}</p>
        <p>@{userData ? userData.username : ""}</p>
      </div>
    </div>
  )
}
