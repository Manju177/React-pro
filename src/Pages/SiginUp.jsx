import React from 'react'
import { Link } from 'react-router-dom'

function SiginUp() {
  return (
    <div className=' p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
         <input type='text' placeholder='username' className='border p-3 rounded-lg'/>
         <input type='text' placeholder='email' className='border p-3 rounded-lg'/>
         <input type=" text" placeholder='password' className='border p-3 rounded-lg'/>
         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign Up</button>
      </form> 
      <div className='flex my-4 gap-1'>
        <p>Have an account ?</p>
        <Link to={'/sign-in'} >
         <span className='text-blue-500'> Sign in</span>
        </Link>
      </div>
    </div>

  )
}

export default SiginUp