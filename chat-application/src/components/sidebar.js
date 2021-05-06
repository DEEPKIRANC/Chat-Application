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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';


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

    const [openStatusModal,setModal]=useState(false);
    const [openDP,setOpenDP]=useState(false);

    const [groupName,setGroupName]=useState("");
    const [groupDesc,setGroupDesc]=useState("");
    const [status,setStatus]=useState("online");

    const [userdropdown,setUserdropdown]=useState(false);
    
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
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            createdBy:userlogin.uid,
            admin:userDetails.display_name
          })

          setOpen(false);
          setGroupName("");
          setGroupDesc("");
        }
        else
        {
          alert("Group Name or Description can't be empty!");
        }
       
      };
    
    const handleCloseDialog=()=>{
      setOpen(false);
      setGroupName("");
      setGroupDesc("");
    }  

    
      useEffect(()=>{
        if(userlogin)
        {
            db.collection("users").doc(userlogin.uid).get().then(snapshot=>
                  
              setUserDetails(snapshot.data())
                    
            )
              console.log("Count this");
        }
    },[userlogin,setUserDetails])

    const handleLogOut=()=>{
        var answer=window.confirm("Do you wish to log out?");
        if(answer)
        {
          
          firebaseApp.auth().signOut();
          
        }


 
        
    }

    

    const closeStatusModal=(e)=>{
      e.preventDefault();
      db.collection("users").doc(userlogin.uid).update({

        status:status
      })
      setUserDetails(prev=>{return {...prev,status:status}});
      setModal(false);
    }

    const handleDisplayPicture=(e)=>{
      console.log("Hello");
    }
    return (
        <div className="sidebar__component">
            <div className="header">
                <Avatar src="https://avatars.dicebear.com/api/human/1234.svg" style={{width:'3rem',height:'3rem'}} />
                <div className="username">{userlogin && <><h4>{userDetails.display_name}</h4></>}</div>
                <div className="status__section">
                  {userlogin && userDetails.status==="online" && <span className="statusColor" style={{marginTop:"0px",marginRight:"10px"}}></span>}
                  {userlogin && userDetails.status==="inactive" && <Brightness3Icon style={{display:"inline",color:"#ffd700"}}/>}
                  {userlogin && userDetails.status==="busy" && <span className="busy" style={{marginTop:"0px",marginRight:"10px"}}></span>}
                  {userlogin && userDetails.status==="chilling" && <AudiotrackIcon style={{display:"inline",color:"#00ffff"}}/>}
                  <p>{userlogin && <>{userDetails.status}</>}</p>
                </div>
                <IconButton>
                <AddIcon onClick={handleClickOpen} style={{color:"white",marginTop:"-15px"}} />    
                </IconButton>    
                
                {!userdropdown &&  <IconButton>
                
                <ExpandMoreIcon onClick={()=>setUserdropdown(prev=>!prev)} style={{color:"white",marginTop:"-15px"}}/>
                
            </IconButton>}


               {userdropdown && <> <IconButton>
                
               <ExpandLessIcon className="expand__icon" onClick={()=>setUserdropdown(prev=>!prev)} style={{color:"white",marginTop:"-15px"}}/>
               
           </IconButton>
           <div className="user__dropdown">
           <ul>
             <li><span onClick={()=>setModal(true)}>Change Status</span></li>

             <li><span>Change Display Picture</span></li>
             <li><span onClick={handleLogOut}>Log Out</span></li>
           </ul>
         </div>

        {/*Status Dialog box*/}

         <Dialog
        open={openStatusModal}
        onClose={closeStatusModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Select a status 
          </DialogContentText>
          <select name="status" style={{width:"100%",margin:"auto"}} value={status} onChange={(e)=>setStatus(e.target.value)} >
            <option value="online">Online</option>
            <option value="inactive">Inactive</option>
            <option value="busy">Busy</option>
            <option value="chilling">Chilling</option>
          </select>
        </DialogContent> 
        <Button onClick={(e)=>closeStatusModal(e)} color="primary">
            Set Status
          </Button>       
      </Dialog>

        {/*Display picture box*/}
        <Dialog
        open={openDP}
        onClose={handleDisplayPicture}
        aria-labelledby="form-dialog-title"
      >

        </Dialog>
      </>
           }
                
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default Sidebar
