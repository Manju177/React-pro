import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { signInStart,signInCompleted,signInError } from '../redux/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';

function SiginIn() {
  const [formData,setFormData]=useState({})

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {loading,error}=useSelector((state)=>state.user)

  const handleChange=(e)=>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value
        });
  };

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res=await fetch('/api/auth/signin',
      {
       method:'POST',
       headers:{
        'Content-Type': 'application/json',
       },
       body:JSON.stringify(formData),
      });
      const data=await res.json()
      console.log('res',data)
      if(data.success === false){
        dispatch(signInError(data.message))
        return;
      }
     
      dispatch(signInCompleted(data))
      navigate('/')
    } catch (error) {
      dispatch(signInError(error.message))
      
      
    }

  }
  return (
    <div className=' p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
         <input type='text' id='email' onChange={handleChange} placeholder='email' className='border p-3 rounded-lg'/>
         <input type=" text" id='password' onChange={handleChange} placeholder='password' className='border p-3 rounded-lg'/>
         <button disabled={loading}  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading?'loading...':'Sign In'}</button>
      </form> 
      <div className='flex my-4 gap-1'>
        <p>Dont have an account ?</p>
        <Link to={'/signup'} >
         <span className='text-blue-500'> Sign Up</span>
        </Link>
      </div>
      {error&& <p className='text-red-600'>{error}</p>}
    </div>

  )
}

export default SiginIn