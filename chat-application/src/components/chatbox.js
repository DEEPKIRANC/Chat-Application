import React ,{useState,useEffect,useContext} from 'react'
import {useMediaQuery} from "react-responsive";
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {Avatar , IconButton} from "@material-ui/core";
import {DataContext} from "../hooks/Dataprovider"
import {db} from "../firebase";
import "../styles/chatbox.css"
function Chatbox() {
    const [userlogin,,selectedChat,,,,messages,setMessages]=useContext(DataContext);
   // const [boolval,setBoolVal]=useState(false);
    const [input,setInput]=useState("");

    useEffect(()=>{

        if(selectedChat.length>0)
        {
            db.collection("groups").doc(selectedChat[0].id).collection("messages").orderBy("sentAt","asc").onSnapshot((snapshot)=>{
                const messagesArr=snapshot.docs.map(doc=>{
                    return {...doc.data(),messageId:doc.id}
                })
                console.log(messagesArr);
                setMessages(messagesArr);
            })
        }
     
        
     
    }
    ,[selectedChat,setMessages])

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
                <h3>{selectedChat.length>0?selectedChat[0].name:null}</h3>
                <p>{selectedChat.length>0?selectedChat[0].description:null}</p>
            </div>
                <IconButton>
                    <EditIcon style={{color:"white"}}/>
                </IconButton>    
                <IconButton>
                    <MoreVert style={{color:"white"}}/>
                </IconButton>                
          </div>
          <div className="chatbody">
              {

                messages.length>0?messages.map(message=>(

                    <div key={message.messageId} className={`chat_message ${message.senderId===userlogin?.uid && `sender`}`}>
                    <p>
                        <span className="name">{message.senderName}</span>
                        {message.message}
                        <span className="timestamp">{message.sentAt.toDate().toString().trim().substring(0,28)}</span>
                    </p>
                  </div>
                )) :null
       
              }
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
    )
   }
   else
   {
       return <div></div>
   }
   
}

export default Chatbox
