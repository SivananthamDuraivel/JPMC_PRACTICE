import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [errorMsg,setErrorMsg]=useState("")
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:4080/auth/signUp",{email,password,confirmPassword})
    .then(res=>{
      console.log(res.data) 
      if(res.data==="added")
      {
        navigate("/signIn")
        console.log("moving to signIn page")
      }
      else
        setErrorMsg(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='signUpPage'>
      <div className="SignUpContainer">
        <div className='SignUpFields'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Email</label><br />
            <input type="email" name="" id="userName" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <label htmlFor="">Password</label><br />
            <input type="password" name="" id="password" onChange={(e) => setPassword(e.target.value)} />
            <br /><br />
            <label htmlFor="">Confirm Password</label><br />
            <input type="password" name="" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
            <br /><br />
            <button type='submit'>SignUp</button>
            {(errorMsg.length>0)?<p style={{color:'red'}}>{errorMsg}</p>:null}
          </form>
        </div>
        <div className='SignUpBoard'>
          <h3>Just a step away to join with us!</h3>
        </div>
      </div>
    </div>
  )
}

export default SignUp
