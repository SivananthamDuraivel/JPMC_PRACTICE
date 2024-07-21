import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Landing2 = () => {
  
  const [imgUrl,setImgUrl]=useState()

  const loadImg=()=>{
    axios.post("http://localhost:4080/auth/photo")
    .then(res=>{
      console.log(res.data.profile)
      if(res)
        setImgUrl(res.data.profile)
    })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    loadImg()
  },[])

  return (
    <div>
    <a href="/feature">Feature</a>
    <a href="/adminFeature">AdminFeature</a>
    <img src={imgUrl} alt="user profile" height="100px" width="100px" style={{float:'right'}} />
    </div>
  )
}

export default Landing2
