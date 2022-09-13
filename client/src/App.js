import './App.css';
import Register from './components/register';
import Login from './components/login';
import {Routes,BrowserRouter,Route} from "react-router-dom" 
import Content from './components/content';
import Publish from './components/publishContent';
import { useState,useEffect } from 'react';
function App() {
  const [mainData,setMainData]=useState()
  let token = localStorage.getItem("authorization")
  useEffect(() => {
    fetch("http://localhost:3004/all", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMainData(data);
      });
  }, [token]);

  if(token==null){
    localStorage.setItem("autorization","")
  }else{
    token=token
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/login" element={<Login mainData={mainData}/>}></Route>
      <Route path="/content" element={<Content mainData={mainData}/>}></Route>
      <Route path="/publishContent" element={<Publish/>}></Route>
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
