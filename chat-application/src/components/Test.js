import React,{useState,useEffect,useContext,useRef} from 'react';
import {Link} from "react-router-dom";
import "../styles/mobiletest.css";
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Avatar , IconButton} from "@material-ui/core";
import {DataContext} from "../hooks/Dataprovider";
import {db} from "../firebase";
import firebase from "firebase";

function Test() {
    const [userlogin,,selectedChat,,,,messages,setMessages]=useContext(DataContext);
    const [currentUser,setCurrentUser]=useState("");
    const [input,setInput]=useState("");
    const randomdiv=useRef();
    

    useEffect(()=>{

        
        randomdiv.current?.scrollIntoView({behaviour:"smooth"});

    },[messages])

    useEffect(()=>{

        if(selectedChat.length>0)
        {
            db.collection("groups").doc(selectedChat[0].id).collection("messages").orderBy("sentAt","asc").onSnapshot((snapshot)=>{
                const messagesArr=snapshot.docs.map(doc=>{
                    return {...doc.data(),messageId:doc.id}
                })
               // console.log(messagesArr);
                setMessages(messagesArr);
            })
        }
     
        
     
    }
    ,[selectedChat,setMessages])


    useEffect(()=>{
        if(userlogin)
        {
            db.collection("users").doc(userlogin.uid).get().then(snapshot=>
                  setCurrentUser(snapshot.data())  
            )

        }
    },[userlogin])

    const sendMessage=(e)=>{
        e.preventDefault();

        if(input.trim().length>0 && selectedChat.length>0)
        {
            db.collection("groups").doc(selectedChat[0].id).collection("messages").add({
                message:input,
                senderId:userlogin.uid,
                senderName:currentUser.display_name,
                sentAt:firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        else
        {
            alert("You can't send empty text messages!");
        }

        console.log("You have typed =>>>" + input);
        setInput("");
    }

    const generateLightColorHex=()=> {
        let color = "#";
        for (let i = 0; i < 3; i++)
          color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
       
          return color;
      }

  

   
    
    return (
        <div style={{display:"flex",justifyContent:"flex-start",height:"90vh",width:"90vw"}}>
        <div className="mobile_chatbox__body">
          <div className="mobile_header">
                <Link to="/"><ArrowBackIcon style={{color:"white"}}/></Link>
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg" style={{width:'2rem',height:'2rem'}}  />
            <div className="mobile_channel_info"> 
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
          <div className="mobile_chatbody">
          {

            messages.length>0?messages.map(message=>(

            <div key={message.messageId} className={`mobile_chat_message ${message.senderId===userlogin?.uid && `mobile_sender`}`}>
            <p>
                <span className="mobile_name" style={{color:generateLightColorHex(),fontWeight:"bold"}}>{message.senderName}</span>
                {message.message}
            </p>
            <span className="mobile_timestamp">{message.sentAt!==null && message.sentAt.toDate().toString().trim().substring(4,28)}</span>
            
        </div>
)) :null

}
    <div ref={randomdiv}></div>
          </div>
          <div className="mobile_chat__footer">
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
