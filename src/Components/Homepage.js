import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import RightWidgets from './RightWidgets'

export default function Homepage({currentUser}) {
  return (
    <div className="home">
      <Sidebar currentUser={currentUser}></Sidebar>
      <Feed currentUser={currentUser}></Feed>
      <RightWidgets></RightWidgets>
    </div>
  )
}
