import React,{useEffect,useState,useContext} from 'react'
import {Avatar} from "@material-ui/core"
import "../styles/chats.css"
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";
import {DataContext} from "../hooks/Dataprovider";
import {db} from "../firebase";



function Chat(props) {
    let windowSize=useMediaQuery({query:`(max-width:600px)`});
    const [randomText,setRandomText]=useState("");
    const {key,id,name}=props;
    const [,,selectedChat,setSelectedChat,groups,]=useContext(DataContext);
    const [messageList,setMessageList]=useState([]);
    const [defaultMessage,setDefaultMessage]=useState("No Conversations Yet!");
    
useEffect(()=>{
    
    db.collection("groups").doc(id).collection("messages").orderBy("sentAt","desc").onSnapshot((snapshot)=>{
        const list=snapshot.docs.map((doc)=>{
            return { ...doc.data(),messageId:doc.id }
        })
        setMessageList(list);
    })

    setRandomText(Math.floor(Math.random() * 5000));
},[groups])


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
                <p>{messageList.length>0 ? messageList[0].senderName+" : "+messageList[0].message.substring(0,25)+"..." : defaultMessage }</p>
            </div>
            <span>{messageList.length>0 && messageList[0].sentAt.toDate().toString().substring(0,10)}</span>
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
                <p>{messageList.length>0 ? messageList[0].senderName+" : "+messageList[0].message.substring(0,25)+"..." : defaultMessage}</p>
            </div>
            <span>{messageList.length>0 && messageList[0].sentAt.toDate().toString().substring(0,10)}</span>
        
            </div>
        <hr style={hrstyle} />
       </div>
    )
    }
}

export default Chat
