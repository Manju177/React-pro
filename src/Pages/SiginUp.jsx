import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function SiginUp() {
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const navigate=useNavigate()

  const handleChange=(e)=>{
        setFormData({
          ...formData,
          [e.target.id]:e.target.value
        });
  };

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      setLoading(false)
      const res=await fetch('/api/auth/signup',
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
        setError (data.message)
        setLoading(false)
        return;
      }
      navigate('/signin')
      setError(null) 
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message);
      
    }

  }
  return (
    <div className=' p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
         <input type='text' id='username' onChange={handleChange} placeholder='username' className='border p-3 rounded-lg'/>
         <input type='text' id='email' onChange={handleChange} placeholder='email' className='border p-3 rounded-lg'/>
         <input type=" text" id='password' onChange={handleChange} placeholder='password' className='border p-3 rounded-lg'/>
         <button disabled={loading}  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading?'loading...':'Sign Up'}</button>
      </form> 
      <div className='flex my-4 gap-1'>
        <p>Have an account ?</p>
        <Link to={'/sign-in'} >
         <span className='text-blue-500'> Sign in</span>
        </Link>
      </div>
      {error&& <p className='text-red-600'>{error}</p>}
    </div>

  )
}

export default SiginUp