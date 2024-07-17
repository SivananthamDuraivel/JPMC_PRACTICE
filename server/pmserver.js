const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT =3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Route to set the cookie
app.get('/set-cookie', (req, res) => {
  const valueToStore = 'sivanantham'; // This could be any value you want to store
  res.cookie('myCookie', valueToStore, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  res.send('Cookie has been set');
});

// Route to retrieve and use the cookie
app.get('/get-cookie', (req, res) => {
  const storedValue = req.cookies.myCookie;
  if (storedValue) {
    res.send(`Stored value in cookie is: ${storedValue}`);
  } else {
    res.send('No cookie found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
