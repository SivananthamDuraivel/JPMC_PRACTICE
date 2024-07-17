
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feature = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getFeature = async () => {
      try {
        const res = await axios.post("http://localhost:4080/auth/feature");
        if (res && res.data) {
          setUserData(res.data);
        }
      } catch (err) {
        console.log("no user data received");
      }
    };

    getFeature();
  }, []);

  return (
    <div>
      <h1>Email: {userData.email}</h1>
    </div>
  );
}

export default Feature;
