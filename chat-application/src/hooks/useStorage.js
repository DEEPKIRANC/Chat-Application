import React,{useState,useEffect,useContext} from "react";
import {db,storage} from "../firebase";
import {DataContext} from "./Dataprovider";
const useStorage=(file)=>{
    const [userlogin,,,,,,,,,setUserDetails]=useContext(DataContext);
    const [url,setUrl]=useState(null);
    const [progress,setProgress]=useState(0);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const imageref=storage.ref(file.name);
        imageref.put(file).on('state-changed',(snap)=>{
            let percentage=(snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(percentage);
        },(err=>{
            setError(err);
        }),
        async()=>{
            const url=await imageref.getDownloadURL();
            db.collection("users").doc(userlogin.uid).update({
                photo_url:url
            })
            setUrl(url);
            console.log(url);
            setUserDetails(userDetails=>{return {...userDetails,photo_url:url}})
        }
        )
    },[file])

    return {url,progress,error}

}

export default useStorage;