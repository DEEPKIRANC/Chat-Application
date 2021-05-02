import React,{useState,useEffect,useContext} from 'react'
import "../styles/login.css"
import {DataContext} from "../hooks/Dataprovider";
import {db,auth} from "../firebase";
 

function Login() {
    const [userlogin,setUserLogin]=useContext(DataContext);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [hasAccount,setHasAccount]=useState(false);
    

    const clearInputs=()=>{
        setName("");
        setEmail('');
        setPassword('');
    }

    const clearErrors=()=>{
        setEmailError('');
        setPasswordError('');
    }


    const spanStyle={
        cursor:"pointer",
        textDecoration:"underline",
        textDecorationColor:"white"
        
    }

    return (
        <div className="main_div">
            
            <div className="inner_div">
            <div className="imageelement"></div>
            <form>

                <input type="text" placeholder="Enter Your Display Name" />

                <input placeholder="Enter Your Email Id" type="text"/>

                <input placeholder="Enter Your Password" type="password"/>    
                {!hasAccount ? <><button type="submit" >Sign Up</button>
                <p>Have an Account ? <span style={spanStyle} onClick={()=>setHasAccount(!hasAccount)}>Sign In</span></p></>
                :<>
                <button type="submit" >Sign In</button>
                <p>Don't Have an Account ? <span style={spanStyle} onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p>
                </>
                }        
            </form>
            </div>    
        </div>
    )
}

export default Login
