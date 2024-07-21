import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let imgUrl=""
    try {
      
      if(profile)
      {
        const data = new FormData();
        data.append("file", profile);
        data.append("upload_preset", "chatApp");
        data.append("cloud_name", "deid8tlfv");

        axios.defaults.withCredentials = false;
        const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/deid8tlfv/image/upload", data);

        imgUrl = uploadResponse.data.url;
        console.log("URL : ",imgUrl)
      }

      const signUpResponse = await axios.post("http://localhost:4080/auth/signUp", {
        name,
        email,
        password,
        confirmPassword,
        imgUrl
      });

      if (signUpResponse.data === "added") {
        navigate("/signIn");
      } else {
        setErrorMsg(signUpResponse.data);
      }
    } catch (error) {
      console.error("Error during signup", error);
      setErrorMsg("An error occurred during signup");
    }
  };

  return (
    <div className='signUpPage'>
      <div className="SignUpContainer">
        <div className='SignUpFields'>
          <form onSubmit={handleSignUp}>
            <label>Name</label><br />
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <br /><br />
            <label>Email</label><br />
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <label>Password</label><br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
            <br /><br />
            <label>Confirm Password</label><br />
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete='off' />
            <br /><br />
            <label>Profile Picture</label><br />
            <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
            <br /><br />
            <button type='submit'>SignUp</button>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
          </form>
        </div>
        <div className='SignUpBoard'>
          <h3>Just a step away to join with us!</h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
