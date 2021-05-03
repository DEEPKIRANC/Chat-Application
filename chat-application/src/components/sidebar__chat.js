import React,{useContext} from 'react'
import Chat from "./Chat"
import "../styles/sidebar.css"

import {DataContext} from "../hooks/Dataprovider";


function SidebarChat() {

    const [,,,,groups,]=useContext(DataContext);

    return (
        <div className="sidebar__chatbody"> 
            {groups.length>0 ? 
            groups.map((group,index)=>(
                <Chat 
                key={index}
                id={group.id}
                name={group.name}  
                  />
            ))
       :null }

        </div>
    )
}

export default SidebarChat
