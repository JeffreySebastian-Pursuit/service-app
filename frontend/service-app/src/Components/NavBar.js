import React from 'react'
import {NavLink} from 'react-router-dom'
function NavBar() {
  return (
    <div>
        <nav>
            <NavLink exact to='/meetingrooms'>
                Meeting Rooms
            </NavLink>
            <NavLink exact to='bookings'>
                Bookings
            </NavLink>
            <NavLink exact to='/meetingrooms/new'>
                New Room
            </NavLink>
        </nav>
        </div>
  )
}

export default NavBar