import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminFeature = () => {

    const [userData,setUserData] = new useState([])

    useEffect(()=>{
        const getAdminFeature=()=>{
            axios.post("http://localhost:4080/auth/adminFeature")
        .then(res=>{
            console.log("result: ",res)
        if(res.data.length>0)
            setUserData(res.data)
        else
            setUserData(res.data)
        })
        .catch(err=>console.log(err))
        }
        getAdminFeature()
    },[])

  return (
    <div>
    <h3>User data</h3>
    { userData && Array.isArray(userData) ? (
      userData.map((element, index) => (
        <p key={index}>{element.email}</p>
      ))
    ) : (
      <p>{userData}</p>
    )}
  </div>
  
  )
}

export default AdminFeature
