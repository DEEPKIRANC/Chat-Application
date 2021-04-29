import React from 'react'
import {useMediaQuery} from "react-responsive";
import "../styles/chatbox.css"
function Chatbox() {
    let windowSize=useMediaQuery({query:`(max-width:600px)`});
   // console.log(windowSize);
   if(!windowSize)
   {
    return (
        <div className="chatbox__body">
            <div className="header">
                <h1>CHAT BODY</h1>
            </div>
        </div>
    )
   }
   else
   {
       return <div></div>
   }
   
}

export default Chatbox
