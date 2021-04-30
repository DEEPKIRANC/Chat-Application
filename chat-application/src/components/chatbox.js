import React from 'react'
import {useMediaQuery} from "react-responsive";
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import {Avatar , IconButton} from "@material-ui/core";
import "../styles/chatbox.css"
function Chatbox() {
    let windowSize=useMediaQuery({query:`(max-width:600px)`});
   // console.log(windowSize);
   if(!windowSize)
   {
    return (
        <div className="chatbox__body">
            <div className="header">
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg" style={{width:'3rem',height:'3rem'}}  />
            <div className="channel_info"> 
                <h3>Group Name</h3>
                <p>Last Seen at...</p>
            </div>
                <IconButton>
                    <EditIcon style={{color:"white"}}/>
                </IconButton>    
                <IconButton>
                    <MoreVert style={{color:"white"}}/>
                </IconButton>                
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
