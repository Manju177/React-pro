import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SiginUp from './Pages/SiginUp'
import Profile from './Pages/Profile'

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SiginUp/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
