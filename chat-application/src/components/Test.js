import React,{useState,useEffect,useContext} from 'react';
import {Link} from "react-router-dom";
import "../styles/mobiletest.css";
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Avatar , IconButton} from "@material-ui/core";
import {DataContext} from "../hooks/Dataprovider";

function Test() {
    const[,,selectedChat,]=useContext(DataContext);
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
    return (
        <div style={{display:"flex",justifyContent:"flex-start",height:"90vh",width:"90vw"}}>
        <div className="chatbox__body">
          <div className="header">
                <Link to="/"><ArrowBackIcon style={{color:"white"}}/></Link>
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg" style={{width:'2rem',height:'2rem'}}  />
            <div className="channel_info"> 
            <h3>{selectedChat.length>0?selectedChat[0].name:null}</h3>
                <p>{selectedChat.length>0?selectedChat[0].description.substring(0,20)+"...":null}</p>
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

            {boolval && ( <div className="chat_message sender"><p>
                    <span className="name">Harsh Seth</span>
                    Hey Deep! Welcome to the group.Hppe you are doing good buddy . Let's plan to watch a movie tonight.
                    <span className="timestamp">10:05 pm</span>
                </p>
    </div> ) }    
          </div>
          <div className="chat__footer">
              <IconButton>
                <InsertEmoticonIcon style={{color:"white",marginBottom:"20px"}}/>
              </IconButton>
              <form>
                <input type="text" placeholder="Type Your Message Here" value={input}  onChange={e=>setInput(e.target.value)} />
                <button type="submit"  onClick={(e)=>sendMessage(e)}></button>
              </form>
              <IconButton>
                <AddAPhotoIcon style={{color:"white",marginBottom:"20px"}}/>
              </IconButton>  
          </div>   

       </div>
       </div>
    )
}

export default Test
