import React from 'react'
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "../styles/sidebar.css"
function Sidebar() {
    return (
        <div className="sidebar__component">
            <div className="header">
                <Avatar style={{width:'3rem',height:'3rem'}} src="../temp_images/Profile_Deep-min.jpg"/>
                <span>Currently Active</span>
                <ExitToAppIcon />
            </div>
        </div>
    )
}

export default Sidebar
