import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

const Register=()=>{
    const navigate=useNavigate()
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const handleUsername=(e)=>{
    setName(e.target.value)
}
const handleEmail=(e)=>{
    setEmail(e.target.value)

}
const handlePassword=(e)=>{
    setPassword(e.target.value)

}
const handleRegister=()=>{
    fetch("http://localhost:3004/register", {
            method: "post",
            body: JSON.stringify({
                name,email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            
        }).catch((err) => {
            console.log(err)
        })
        navigate("/login")
     }
  
   
    return(
        <>
            <div className="cointainer">
            <h2>Login</h2>
                <div>
                    <label for="name">Name</label>
                </div>
                <div>
                <input id="name" type="text" placeholder="username" onChange={(e)=>{handleUsername(e)}} ></input>
                
                </div>
                <div>
                    <label for="email">Email</label>
                </div>
                <div>
                <input id="email" type="email" placeholder="email" onChange={(e)=>{handleEmail(e)}} ></input>
                
                </div>
                <div>
                    <label for="password">Password</label>
                </div>
                <div>
                <input id="password" type="password" placeholder="password" onChange={(e)=>{handlePassword(e)}} ></input>
                
                </div>
                <button onClick={handleRegister}>Register</button>
            </div>
        </>
    )
    }
export default Register;