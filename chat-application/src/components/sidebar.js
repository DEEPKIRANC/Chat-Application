import React,{useState,useEffect,useContext} from 'react'
import { Avatar , IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "../styles/sidebar.css"
import {db} from "../firebase";
import SidebarChat from './sidebar__chat';
import {DataContext} from "../hooks/Dataprovider";
import {firebaseApp} from "../firebase";
function Sidebar() {
    const [userlogin,,,]=useContext(DataContext);

    const [userDetails,setUserDetails]=useState('');
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
                    <ExitToAppIcon onClick={handleLogOut} style={{color:"white"}} />
                </IconButton>
            </div>
            <SidebarChat/>
        </div>
    )
}

export default Sidebar
