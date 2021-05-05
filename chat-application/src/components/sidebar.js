import React,{useState,useEffect,useContext} from 'react'

import { Avatar , IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "../styles/sidebar.css"
import {db} from "../firebase";
import SidebarChat from './sidebar__chat';
import {DataContext} from "../hooks/Dataprovider";
import {firebaseApp} from "../firebase";
import firebase from "firebase";
function Sidebar() {
    const [userlogin,,,]=useContext(DataContext);

    const [userDetails,setUserDetails]=useState('');
    
    const [open, setOpen] = useState(false);

    const [groupName,setGroupName]=useState("");
    const [groupDesc,setGroupDesc]=useState("");
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (e) => {
        e.preventDefault();
        if(groupName.trim().length > 0 && groupDesc.trim().length>0)
        {
          db.collection("groups").add({
            name:groupName,
            description:groupDesc,
            createdAt:firebase.firestore.FieldValue.serverTimestamp()
          })
          setOpen(false);
        }
        else
        {
          alert("Group Name or Description can't be empty!");
        }
       
      };
    
    
      useEffect(()=>{
        if(userlogin)
        {
            db.collection("users").doc(userlogin.uid).get().then(snapshot=>
                  setUserDetails(snapshot.data())  
            )

        }
    },[userlogin])

    const handleLogOut=()=>{
        firebaseApp.auth().signOut();
    }
    return (
        <div className="sidebar__component">
            <div className="header">
                <Avatar src="https://avatars.dicebear.com/api/human/1234.svg" style={{width:'3rem',height:'3rem'}} />
                <div className="username">{userlogin && <><h4>{userDetails.display_name}</h4></>}</div>
                <p><span className="statusColor"></span>{userlogin && <>{userDetails.status}</>}</p>
                <IconButton>
                <AddIcon onClick={handleClickOpen} style={{color:"white",marginTop:"-15px"}} />    
                </IconButton>    
                
                <IconButton>
                    <ExitToAppIcon onClick={handleLogOut} style={{color:"white",marginTop:"-15px"}} />
                </IconButton>
            </div>
            <SidebarChat/>

            {/*modal code*/}

            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter Group Name and Description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={groupName}
            onChange={(e)=>setGroupName(e.target.value)}
            id="name"
            label="Group Name"
            type="text"
            required="required"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="text"
            value={groupDesc}
            onChange={(e)=>setGroupDesc(e.target.value)}
            required="required"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>handleClose(e)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default Sidebar
