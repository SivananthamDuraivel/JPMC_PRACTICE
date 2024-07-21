import React from 'react'
import { useUserContext } from '../Context/UserContext'

import SideDrawer from './SideDrawer'
import MyChat from './MyChat'
import ChatBox from './ChatBox'
import './chatStyle.css'

const ChatHome = () => {

const {user,setUser}=useUserContext()
console.log("chat home : ",user)
  return (
    <div>
          <div className='titleBar'>
            <div><button>Search</button></div>
            <div><h3>CHAT APP</h3></div>
            <div><p>Notification</p></div>
          </div>
          {user && <SideDrawer />}
          <div className="chatHomeContainer">
              {user && <MyChat />}
              {user && <ChatBox />}
          </div>
    </div>
  )
}

export default ChatHome
