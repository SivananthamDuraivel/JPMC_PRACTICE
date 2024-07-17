import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SingIn.css'

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setErrorMsg]=useState("")
  const navigate=useNavigate()

  axios.defaults.withCredentials=true;
  //add cookie info into the request

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    axios.post("http://localhost:4080/auth/signIn",{email,password})
    .then(res=>{
      console.log(res.data)
      if(res.data==="valid")
      {
        navigate("/landing2")
        console.log("moving from signin")
      }
      else
        setErrorMsg(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='signInPage'>
      <div className="signInContainer">
        <div className='signInFields'>
          <form action="">
            <label htmlFor="">Email</label><br />
            <input type="email" name="" id="userName" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <label htmlFor="">Password</label><br />
            <input type="password" name="" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
            <br /><br />
            <button onClick={(e)=>handleSubmit(e)} >SignIn</button>

            {(errorMsg.length>0)? <p style={{color:'red'}}>{errorMsg}</p>:null}

          </form>
        </div>
        <div className='SignInBoard'>
          <h3>Welcome back! Let's see what's new! </h3>
        </div>
      </div>
    </div>
  )
}

export default SignIn
