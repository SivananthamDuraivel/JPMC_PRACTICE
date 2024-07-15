import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feature = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getFeature = () => {
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:4080/auth/feature")
        .then(res => {
          if (res && res.data) {
            setUserData(res.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    };

    getFeature();
  }, []);

  return (
    <div>
    
          <h1>Email: {userData.email}</h1>
          <h2>Password: {userData.password}</h2>
  
    </div>
  );
}

export default Feature;
