import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const {createUser}=useSelector((state)=>state)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4 self-center'>
        <img src={createUser.avatar} alt='profile'
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type='text' placeholder='username'
        className='border p-3 rounded-lg'/>
        <input type='text' placeholder='email'
        className='border p-3 rounded-lg'/>
        <input type='text' placeholder='password'
        className='border p-3 rounded-lg'/>
        <button className='bg-slate-800 p-3 text-center rounded-lg uppercase text-white'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
