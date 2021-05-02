import React from 'react'
import "../styles/login.css"

function Login() {
    return (
        <div className="main_div">
            <img src="../loginbackground.png" />
            <div className="inner_div">
            <form>

                <input type="text" placeholder="Enter Your Display Name" />

                <input placeholder="Enter Your Email Id" type="text"/>

                <input placeholder="Enter Your Password" type="password"/>    

            </form>
            </div>    
        </div>
    )
}

export default Login
