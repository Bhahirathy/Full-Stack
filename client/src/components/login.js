import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate=useNavigate()
    const [error, setError] = useState("")
    const [login, setLogin] = useState({ email: "", password: "" })
    const handleloginsubmit = (e) => {
        e.preventDefault();
        axios({
            url: "http://localhost:3004/login",
            method: "post",
            headers: {
            },
            data: login
        }).then((loginData) => {
            localStorage.setItem("authorization", loginData.data.authToken);
        }).catch((err) => {
            console.log(err.response.data)
            setError(err.response.data)
        })
        navigate("/content")
    }
    return (
        <>
        <div className='login-full'>
        <div className='login'>
        <h2>Login</h2>
          <input type="text" placeholder='email' onChange={(e)=>{setLogin({...login, email: e.target.value})}}/>
          <br></br>
          <input type="password" placeholder='Password' onChange={(e)=>{setLogin({...login, password: e.target.value})}}/>
          <p>{error}</p>
          <button onClick={(e)=>handleloginsubmit(e)}>Submit</button>
          </div>
          </div>
        </>
      )

}
export default Login