import React,{useEffect,useState} from 'react'
import {Avatar} from "@material-ui/core"
import "../styles/chats.css"
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";


function Chat() {
    let windowSize=useMediaQuery({query:`(max-width:600px)`});
    const [randomText,setRandomText]=useState("");
 
        
useEffect(()=>{
    
    setRandomText(Math.floor(Math.random() * 5000));
},[])


const handleClick=()=>{

    
   
    
}
    if(windowSize)
    {
    return (<Link to="/mobilechat" style={{textDecoration:"none"}}>
        <div className="chats" onClick={handleClick}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${randomText}.svg`}/>
           <div className="channel_info"> 
                <h3>Group Name</h3>
                <p>Last Message</p>
            </div>
            <span>Timestamp</span>
        </div>
        </Link>
    )
    }
    else
    {
        return (
        <div className="chats" onClick={handleClick}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${randomText}.svg`}/>
           <div className="channel_info"> 
                <h3>Group Name</h3>
                <p>Last Message</p>
            </div>
            <span>Timestamp</span>
        </div>
       
    )
    }
}

export default Chat
