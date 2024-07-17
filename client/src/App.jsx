import { useState } from 'react'
import axios from 'axios';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Landing from './pages/Landing/Landing'
import SignUp from './pages/SignUp/SignUp'
import Feature from './pages/Feature/Feature'

axios.defaults.withCredentials=true;

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path='/'></Route>
        <Route element={<SignIn/>} path='/signIn'></Route>
        <Route element={<SignUp/>} path='/signUp'></Route>
        <Route element={<Feature/>} path='/feature'></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
