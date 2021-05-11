import React,{useState,useEffect,createContext} from "react"
import {db} from "../firebase";

const DataContext =createContext();

const DataProvider =(props)=>{
const [userlogin,setUserLogin]=useState("");
const [userDetails,setUserDetails]=useState("");
const [selectedChat,setSelectedChat]=useState([]);
const [groups,setGroups]=useState([]);
const [messages,setMessages]=useState([]);

useEffect(()=>{


    db.collection("groups").orderBy("createdAt","desc").onSnapshot((snapshot)=>{
       
        const groups=snapshot.docs.map(doc=>{return {...doc.data(),id:doc.id}})
        console.log(groups);
        setSelectedChat(groups);    
        setGroups(groups);
    });
    

},[])

return <DataContext.Provider value={[userlogin,setUserLogin,selectedChat,setSelectedChat,groups,setGroups,messages,setMessages,userDetails,setUserDetails]}>
{props.children}

</DataContext.Provider>
}

export {DataContext,DataProvider}