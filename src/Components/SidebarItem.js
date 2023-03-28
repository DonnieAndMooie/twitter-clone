import React from 'react'

export default function SidebarItem({Icon, text, selected}) {
  return (
    <div className='sidebar-item'>
        <Icon className="sidebar-icon"></Icon>
        <p className={selected ? "bold" : ""}>{text}</p>
    </div>
  )
}
