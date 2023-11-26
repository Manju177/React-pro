import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-400 font-bold'>Manju</span>
                    <span className='text-slate-800 font-bold'>Estate</span>
                </h1>
                <form className='bg-slate-100 rounded-lg p-3 flex items-center'>
                    <input type='text'
                        placeholder='Search..'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    />
                    <FaSearch />
                </form>
                <ul className='flex justify-between gap-4'>
                    <Link to={'./'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        Home
                    </li>
                    </Link>
                    <Link to={'/about'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        About
                    </li>
                    </Link>
                    <Link to={'/profile'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        Profile
                    </li>
                    </Link>
                    <Link to={'/signin'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        SignIn
                    </li>
                    </Link>
                    <Link to={'/signup'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>
                        Signup
                    </li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}
