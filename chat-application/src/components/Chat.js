import React,{useEffect,useState,useContext} from 'react'
import {Avatar} from "@material-ui/core"
import "../styles/chats.css"
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";
import {DataContext} from "../hooks/Dataprovider";



function Chat(props) {
    let windowSize=useMediaQuery({query:`(max-width:600px)`});
    const [randomText,setRandomText]=useState("");
    const {key,id,name}=props;
    const [,,selectedChat,setSelectedChat,groups,]=useContext(DataContext);
        
useEffect(()=>{
    
    setRandomText(Math.floor(Math.random() * 5000));
},[])


const handleClick=()=>{

    const chat=groups.filter(group=>group.id===id);
    setSelectedChat(chat);
   
    
}

const hrstyle={color:"#22303C",backgroundColor:"#22303C",height:"2px",opacity:"0.2"}
const mobileHrStyle={color:"white",height:"2px",opacity:"0.2"}


    if(windowSize)
    {
    return (<Link to="/mobilechat" style={{textDecoration:"none"}}>
        <div>
        <div className="chats" onClick={handleClick}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${randomText}.svg`}/>
           <div className="channel_info"> 
                <h3>{name}</h3>
                <p>Last Message</p>
            </div>
            <span>Timestamp</span>
        </div>
        <hr style={mobileHrStyle} />
        </div>
        </Link>
    )
    }
    else
    {
        return (<div>
        <div className="chats" onClick={handleClick}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${randomText}.svg`}/>
           <div className="channel_info"> 
                <h3>{name}</h3>
                <p>Last Message</p>
            </div>
            <span>Timestamp</span>
        </div>
        <hr style={hrstyle} />
       </div>
    )
    }
}

export default Chat
