import React ,{useState,useEffect} from 'react'
import {useMediaQuery} from "react-responsive";
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import {Avatar , IconButton} from "@material-ui/core";
import "../styles/chatbox.css"
function Chatbox() {
    const [boolval,setBoolVal]=useState(false);

    useEffect(()=>{

        setTimeout(()=>{
            setBoolVal(true)
        },3000)

    },[])


    let windowSize=useMediaQuery({query:`(max-width:600px)`});
   
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
          <div className="chatbody">
              <div className="chat_message">
                <p>
                    <span className="name">Deep Kiran</span>
                    Hey ! This is my first message.
                    <span className="timestamp">10:00 pm</span>
                </p>
              </div>

              {boolval && <div className="chat_message sender"><p>
                    <span className="name">Harsh Seth</span>
                    Hey Deep! Welcome to the group.
                    <span className="timestamp">10:05 pm</span>
                </p>
</div>}    
          </div>
          <div className="chat__footer">
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
