import React from 'react'

export default function SidebarItem({Icon, text, selected, onClick}) {
  return (
    <div className='sidebar-item' onClick={onClick}>
        <Icon className="sidebar-icon" data-testid={"sidebar-icon"}></Icon>
        <p className={selected ? "bold" : ""}>{text}</p>
    </div>
  )
}
