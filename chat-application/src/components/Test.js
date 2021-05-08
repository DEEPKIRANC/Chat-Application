import React,{useState,useEffect,useContext,useRef} from 'react';
import {Link} from "react-router-dom";
import "../styles/mobiletest.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Avatar , IconButton} from "@material-ui/core";
import {DataContext} from "../hooks/Dataprovider";
import {db} from "../firebase";
import firebase from "firebase";

function Test() {
    const [userlogin,,selectedChat,,,,messages,setMessages]=useContext(DataContext);
    const [currentUser,setCurrentUser]=useState("");
    const [open,setOpen]=useState(false);
    const [groupDescription,setGroupDescription]=useState(selectedChat[0].description);
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


    const deletegroup=()=>{
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
            alert("This group is created by : " +selectedChat[0].admin + " , you don't have Admin Access to delete this Group ! ");
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
            if(groupDescription.trim().length>0)
            {
            db.collection("groups").doc(selectedChat[0].id).update({
                description:groupDescription
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
        setGroupDescription("");
    }

   
    
    return (
        <div style={{display:"flex",justifyContent:"flex-start",height:"100vh",width:"100vw"}}>
        <div className="mobile_chatbox__body">
          <div className="mobile_header">
                <Link to="/"><ArrowBackIcon style={{color:"white"}}/></Link>
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg" style={{width:'2rem',height:'2rem'}}  />
            <div className="mobile_channel_info"> 
            <h3>{selectedChat.length>0?selectedChat[0].name:null}</h3>
                <p>{selectedChat.length>0?selectedChat[0].description.substring(0,20)+"...":null}</p>
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
                            value={groupDescription}
                            onChange={(e)=>setGroupDescription(e.target.value)}
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
                    <DeleteForeverIcon onClick={deletegroup} style={{color:"white"}}/>
                </IconButton>                
          </div>
          <div className="mobile_chatbody">
          {

            messages.length>0?messages.map((message,index)=>(

            <div key={index} className={`mobile_chat_message ${message.senderId===userlogin?.uid && `mobile_sender`}`}>
            <p>
                <span className="mobile_name" style={{color:generateLightColorHex(),fontWeight:"bold"}}>{message.senderName}</span>
                {message.message}
                <span className="mobile_timestamp">{message.sentAt!==null && message.sentAt.toDate().toString().trim().substring(4,28)}</span>
                <DeleteForeverIcon style={{fontSize:"small"}} className="mobile_deletemsg" onClick={()=>deleteMsg(message.messageId)}/>
                            
            </p>
            
        </div>
)) :null

}
    <div ref={randomdiv}></div>
          </div>
          <div className="mobile_chat__footer">
              
              <form>
                <input type="text" placeholder="Type Your Message Here" value={input}  onChange={e=>setInput(e.target.value)} />
                <button type="submit"  onClick={(e)=>sendMessage(e)}></button>
              </form>
             
          </div>   

       </div>
       </div>
    )
}

export default Test
