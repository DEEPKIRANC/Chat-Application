import React,{useEffect} from 'react'
import useStorage from "../hooks/useStorage";
function Uploader(props) {
    
    const {file , setfile}=props;
    const {url,progress}=useStorage(file);
    
    useEffect(()=>{
        if(url)
        {
            setfile(null);
            
        }
    },[url])
    return (
        <div style={{padding:"1rem"}}>
            <h3> {progress + "%"} Uploaded </h3>
        </div>
    )
}

export default Uploader
