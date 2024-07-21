
import axios from 'axios';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import Landing from './pages/Landing/Landing'
import SignUp from './pages/SignUp/SignUp'
import Feature from './pages/Feature/Feature'
import AdminFeature from './pages/Feature/AdminFeature';
import Landing2 from './pages/Landing/Landing2';
import ChatHome from './pages/Chat/ChatHome';

axios.defaults.withCredentials=true;

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path='/'></Route>
        <Route element={<Landing2/>} path='/landing2'></Route>
        <Route element={<SignIn/>} path='/signIn'></Route>
        <Route element={<SignUp/>} path='/signUp'></Route>
        <Route element={<ChatHome/>} path='/chatHome'></Route>
        <Route element={<Feature/>} path='/feature'></Route>
        <Route element={<AdminFeature/>} path='/adminFeature'></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
