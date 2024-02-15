import React, { useState,useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'

export default function Header() {
    const {createUser}=useSelector((state)=>state)
    const[searchedItem,setSearchedItem]=useState('')
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(window.location.search)
        console.log('urlParams',urlParams)
        console.log('window.location.search',window.location.search)
        
        urlParams.set('searchedItem',searchedItem)
        console.log('urlParams',searchedItem)
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
      const urlParams=new URLSearchParams(window.location.search);
      const searchTerm=urlParams.get('searchedItem')
      if(searchTerm){
        setSearchedItem(searchTerm)
      }  
    }, [location.search])
    
    return (
        <header className='bg-slate-900  drop-shadow-lg'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-white font-bold'>Manju</span>
                    <span className='text-slate-500 font-bold'>Estate</span>
                </h1>
                <form onSubmit={handleSubmit} className='bg-slate-100 rounded-lg p-3 flex items-center'>
                    <input type='text'
                        placeholder='Search..'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        onChange={(e)=>setSearchedItem(e.target.value)}
                    />
                    <button>
                    <FaSearch />
                    </button>
                </form>
                <ul className='flex justify-between gap-4'>
                    <Link to={'./'}>
                    <li className='hidden sm:inline text-white hover:underline'>
                        Home
                    </li>
                    </Link>
                    <Link to={'/about'}>
                    <li className='hidden sm:inline text-white hover:underline'>
                        About
                    </li>
                    </Link>
               
                    {/* <Link to={'/signin'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        SignIn
                    </li>
                    </Link> */}
                    <Link to={'/profile'}>
                        {createUser
                            ? (
                                <img className='h-7 w-7 rounded-full' src={createUser.avatar} alt='profile'/>
                            ):(
                                <li className='hidden sm:inline text-white hover:underline'>
                                Sign In
                            </li>
                            )
                        }
                    </Link>
                    {/* <Link to={'/signup'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        Signup
                    </li>
                    </Link> */}
                </ul>
            </div>
        </header>
    )
}
