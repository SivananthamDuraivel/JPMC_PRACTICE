
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"],
  credentials: true
}));

const authRouter = require('./router/authRouter');
app.use('/auth', authRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`DB connected and server listening at PORT: ${process.env.PORT}`);
  });
})
.catch(err => {
  console.log(err);
});
