import React,{useState,useEffect,useContext} from 'react'
import "../styles/login.css"
import {DataContext} from "../hooks/Dataprovider";
import {db,firebaseApp} from "../firebase";
import firebase from "firebase";
 

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

    const handleLogin=(e)=>{
        e.preventDefault();
        clearErrors();
   
        firebaseApp
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err=>{
            switch(err.code)
            {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;        
            }
        })
    }


    const handleSignUp=(e)=>{
        e.preventDefault();
        clearErrors();
        if(name.trim().length<1)
        {
        alert("Display Name can't be empty!");
        }
        else
        {
        firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(cred=>{
            return db.collection("users").doc(cred.user.uid).set({
                display_name:name,
                status:"online",
                createdAt:firebase.firestore.FieldValue.serverTimestamp()
            })
        })
        .then(()=>{
            console.log("user added ")
        })
        .catch(err=>{
            switch(err.code)
            {
                case "auth/email-already-in-use":
                case "auth/invalid-user":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;        
            }
        })
    }
    }
    

    const authListener=()=>{
        firebaseApp.auth().onAuthStateChanged((user)=>{
             if(user)
             {
                 clearInputs();
                 setUserLogin(user);


             }
             else
             {
                 setUserLogin("");
             }   
        })
    }

    useEffect(()=>{
        authListener();
    },[])


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

               {!hasAccount && <><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter Your Display Name" /></>}

                <input placeholder="Enter Your Email Id" type="text" value={email} onChange={e=>setEmail(e.target.value)}/>

                <input placeholder="Enter Your Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>    
                {!hasAccount ? <><button type="submit" onClick={e=>handleSignUp(e)} >Sign Up</button>
                <p>Have an Account ? <span style={spanStyle} onClick={()=>setHasAccount(!hasAccount)}>Sign In</span></p></>
                :<>
                <button type="submit" onClick={e=>handleLogin(e)} >Sign In</button>
                <p>Don't Have an Account ? <span style={spanStyle} onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></p>
                </>
                }        
            </form>
            </div>    
        </div>
    )
}

export default Login