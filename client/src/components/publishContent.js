import { useEffect,useState } from "react";

const Publish=()=>{
    const [result,setData]=useState([])
  useEffect(()=>{
    fetch("https://localhost:3004/publishContent").then((data)=>data.json()).then((result)=>{
      setData(result)
    })
  },[]);


return(
        <>
        <p>{result}</p>
        </>
    )
}
export default Publish
