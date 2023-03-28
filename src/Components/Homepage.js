import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'

export default function Homepage({currentUser}) {
  return (
    <div className="home">
      <Sidebar currentUser={currentUser}></Sidebar>
      <Feed currentUser={currentUser}></Feed>
    </div>
  )
}
