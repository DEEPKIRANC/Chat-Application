import React,{useState,createContext} from "react"

const DataContext =createContext();

const DataProvider =(props)=>{
const [userlogin,setUserLogin]=useState("");
//const [chatboxdisplay,setChatBoxDisplay]=useState(true);

return <DataContext.Provider value={[userlogin,setUserLogin]}>
{props.children}

</DataContext.Provider>
}

export {DataContext,DataProvider}