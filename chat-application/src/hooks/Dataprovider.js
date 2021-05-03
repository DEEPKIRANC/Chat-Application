import React,{useState,useEffect,createContext} from "react"
import {db} from "../firebase";

const DataContext =createContext();

const DataProvider =(props)=>{
const [userlogin,setUserLogin]=useState("");
const [selectedChat,setSelectedChat]=useState([]);
const [groups,setGroups]=useState([]);

useEffect(()=>{


    db.collection("groups").orderBy("createdAt","desc").onSnapshot((snapshot)=>{
       
        const groups=snapshot.docs.map(doc=>{return {...doc.data(),id:doc.id}})
        //console.log(groups);
        setSelectedChat(groups);    
        setGroups(groups);
    });
    

},[])

return <DataContext.Provider value={[userlogin,setUserLogin,selectedChat,setSelectedChat,groups,setGroups]}>
{props.children}

</DataContext.Provider>
}

export {DataContext,DataProvider}