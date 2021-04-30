import React from 'react'
import { Avatar , IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "../styles/sidebar.css"
import SidebarChat from './sidebar__chat';
function Sidebar() {
    return (
        <div className="sidebar__component">
            <div className="header">
                <Avatar src="https://avatars.dicebear.com/api/human/1234.svg" style={{width:'3rem',height:'3rem'}} />
                <span><div className="statusColor"></div>Currently Active</span>
                <IconButton>
                    <ExitToAppIcon style={{color:"white"}} />
                </IconButton>
            </div>
            <SidebarChat/>
        </div>
    )
}

export default Sidebar
