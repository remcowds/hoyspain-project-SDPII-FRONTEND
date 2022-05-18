import React from 'react'
import { NavLink } from 'react-router-dom'

const NavElement = (props) => {
  
  return (
    <NavLink to={props.to} onClick={props?.onClick}>
      <SideBarIcon icon={props.icon} text={props.text} selected={props.selected} page={props.page}/>
    </NavLink>
  )
}

const SideBarIcon = ({icon, text, selected, page}) => (

  <div className="text-webgrijs hover:opacity-80 flex flex-row mx-7 justify-center group duration-300 pt-1 py-2 my-2">
    <p className="group-hover:text-gray-400 px-1 duration-300 text-webgrijs">
    {icon}
    </p> 
    <span className="sidebar-icon-group group-hover:opacity-100 group-hover:text-gray-400 duration-300">{text}</span>
    {page===selected && (<OnderlijndeBalk/>)}


  </div>
)

const OnderlijndeBalk = ({icon, text, selected, page}) => (
  <div className="absolute w-20 h-[3px] bg-weboranje mt-[30px] ml-2 group-hover:bg-gray-400 duration-300"/>
)


export default NavElement