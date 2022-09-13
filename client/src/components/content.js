import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./content.css"
const Content=(props)=>{
    const navigate=useNavigate()
    const [data,setData]=useState("")
    const [err,setError]=useState("")
    console.log(props)
    const token=localStorage.getItem("authorization")
    if(token===null){
        localStorage.setItem("authorization","")
    }
    const handlePublish=()=>{

    }
    const handleComment=()=>{

    }
    const handleHistory=()=>{

    }
    const handleLogout=()=>{

    }
    const handleInput=(e)=>{
        setData(e.target.value)
    }
    const handleSave=(e)=>{
        e.preventDefault();
        axios({
            url: "http://localhost:3004/content",
            method: "post",
            headers: {
            },
            data: data
        }).then((Data) => {
           console.log(Data)
        }).catch((err) => {
            console.log(err.response.data)
            setError(err.response.data)
        })
        navigate("/publishContent")
    }

    return(
        <>
        
        <div className="header">{props.mainData.name}</div>
        <div>
            <p onClick={handlePublish}>Publish Content</p>
        </div>
        <div>
            <p onClick={handleComment}>Comment</p>
        </div>
        <div>
            <p onClick={handleHistory}>History</p>
        </div>
        <div>
           <p onClick={handleLogout}>LogOut</p>
        </div>
        <input type="text" onChange={handleInput}></input>
        <div>
            <p>{data}</p>
            <button>edit</button>
            <button onClick={handleSave}>save</button>
        </div>
        
        </>
    )
}
export default Content