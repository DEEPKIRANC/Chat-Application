import React ,{useState,useEffect,useContext,useRef} from 'react'
import {useMediaQuery} from "react-responsive";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Avatar , IconButton} from "@material-ui/core";
import {DataContext} from "../hooks/Dataprovider"
import {db} from "../firebase";
import firebase from "firebase";
import "../styles/chatbox.css"
function Chatbox() {
    const [userlogin,,selectedChat,,,,messages,setMessages]=useContext(DataContext);
   // const [boolval,setBoolVal]=useState(false);
    const [input,setInput]=useState("");
    const [currentUser,setCurrentUser]=useState('');
    const [open,setOpen]=useState(false);
    const [groupdescription,setgroupDescription]=useState(selectedChat.length>0?selectedChat[0].description:"");
    const scrollref=useRef();
    useEffect(()=>{
      
        scrollref.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])

    useEffect(()=>{

        if(selectedChat.length>0)
        {
            db.collection("groups").doc(selectedChat[0].id).collection("messages").orderBy("sentAt","asc").onSnapshot((snapshot)=>{
                const messagesArr=snapshot.docs.map(doc=>{
                    return {...doc.data(),messageId:doc.id}
                })
              //  console.log(messagesArr);
                setMessages(messagesArr);
            })
        }
     
        
     
    }
    ,[selectedChat])

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

        //console.log("You have typed =>>>" + input);
        setInput("");
    }

    const deleteGroup=()=>{
        if(userlogin.uid===selectedChat[0].createdBy)
        {

        var confirm=window.confirm("Do you wish to delete this group permanently..?")
        if(confirm)
        {    
        db.collection("groups").doc(selectedChat[0].id).delete()
        }    
        }
        else
        {

            alert("This group is created by : "+selectedChat[0].admin+ " , you don't have Admin Access to delete this Group ! ");
        }
    }


    const generateLightColorHex=()=> {
        let color = "#";
        for (let i = 0; i < 3; i++)
          color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
       
          return color;
      }

    const deleteMsg=(id)=>{

        const messageSelected=messages.filter(msg=>msg.messageId===id)[0];
        if(userlogin.uid===messageSelected.senderId)
        {
            var confirm=window.confirm("Do you wish to delete this message permanently..?")
            if(confirm){
                db.collection("groups").doc(selectedChat[0].id).collection("messages").doc(id).delete();
            }
       

        }
        else
        {
            alert("You cannot delete messages sent by other users..!");
        }
    }  


    const handleClose=(e)=>{
        e.preventDefault();
        if(userlogin.uid===selectedChat[0].createdBy)
        {
            if(groupdescription.trim().length>0)
            {
            db.collection("groups").doc(selectedChat[0].id).update({
                description:groupdescription
            })
            setOpen(false);
            }
            else
            {
                alert("Group Description can't be empty!");
            }
        }

    }

    const handleCloseDialog=()=>{
        setOpen(false);
        setgroupDescription("");
    }


    let windowSize=useMediaQuery({query:`(max-width:600px)`});
   
   if(!windowSize)
   {




    return (
        <div className="chatbox__body">
          <div className="header">
          
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg" style={{width:'3rem',height:'3rem'}}  />
            <div className="channel_info"> 
                <h4>{selectedChat.length>0?selectedChat[0].name:null}</h4>
                <p>{selectedChat.length>0?selectedChat[0].description:null}</p>
            </div>
                <IconButton>
                    <EditIcon onClick={()=>setOpen(true)} style={{color:"white"}}/>
                </IconButton>    
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Group Name : {selectedChat.length>0?selectedChat[0].name:null} (created by - {selectedChat.length>0?selectedChat[0].admin:null})
                       </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={groupdescription}
                            onChange={(e)=>setgroupDescription(e.target.value)}
                            id="name"
                            label="Group Description"
                            type="text"
                            required="required"
                            disabled={userlogin.uid!==selectedChat[0].createdBy}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e)=>handleClose(e)} color="primary" disabled={userlogin.uid!==selectedChat[0].createdBy}>
                            Update
                        </Button>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <IconButton>
                    <DeleteForeverIcon onClick={deleteGroup} style={{color:"white"}}/>
                </IconButton>                
          </div>
          <div className="chatbody">
              {

                messages.length>0?messages.map((message,index)=>(

                    
                      <div key={index} className={`chat_message ${message.senderId===userlogin?.uid && `sender`}`}>  
                            <p>
                            
                
                              
                                <span className="name" style={{color:generateLightColorHex(),fontWeight:"bold"}}>{message.senderName}</span>
                                {message.message}
                                <span className="timestamp">{message.sentAt!==null && message.sentAt.toDate().toString().trim().substring(4,28)}</span>
                                <DeleteForeverIcon style={{fontSize:"medium"}} className="deletemsg" onClick={()=>deleteMsg(message.messageId)}/>
                            
                            </p>
                        
                    
                       </div>   
                )) :null
       
              }
              <div ref={scrollref}></div>
          </div>    
          <div className="chat__footer">
             
              <form>
                <input type="text" placeholder="Type Your Message Here..." value={input}  onChange={e=>setInput(e.target.value)} />
                <button type="submit"  onClick={(e)=>sendMessage(e)}></button>
              </form>
              
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
