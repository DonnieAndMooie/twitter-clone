import React from 'react'
import Sidebar from './Sidebar'

export default function Homepage({currentUser}) {
  return (
    <div className="home">
      <Sidebar currentUser={currentUser}></Sidebar>
    </div>
  )
}
