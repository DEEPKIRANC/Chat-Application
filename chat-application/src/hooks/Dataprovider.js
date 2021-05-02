import React,{useState,createContext} from "react"

const DataContext =createContext();

const DataProvider =(props)=>{
const [chatlistdisplay,setChatListDisplay]=useState(true);
const [chatboxdisplay,setChatBoxDisplay]=useState(true);

<DataContext.Provider value={[chatlistdisplay,setChatListDisplay,chatboxdisplay,setChatBoxDisplay]}>
{props.children}

</DataContext.Provider>
}

export {DataContext,DataProvider}