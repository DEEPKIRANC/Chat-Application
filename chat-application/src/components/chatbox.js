import React ,{useState,useEffect} from 'react'
import {useMediaQuery} from "react-responsive";
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {Avatar , IconButton} from "@material-ui/core";
import "../styles/chatbox.css"
function Chatbox() {
    const [boolval,setBoolVal]=useState(false);
    const [input,setInput]=useState("");

    useEffect(()=>{

        setTimeout(()=>{
            setBoolVal(true)
        },3000)

    },[])

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("You have typed =>>>" + input);
        setInput("");
    }

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
              <IconButton>
                <InsertEmoticonIcon style={{color:"white"}}/>
              </IconButton>
              <form>
                <input type="text" placeholder="Type Your Message Here" value={input}  onChange={e=>setInput(e.target.value)} />
                <button type="submit"  onClick={(e)=>sendMessage(e)}></button>
              </form>
              <IconButton>
                <AddAPhotoIcon style={{color:"white"}}/>
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
