import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

export default function PrivateRoute() {
  const {createUser}=useSelector((state)=>state)
  return createUser ? <Outlet/> :<Navigate to='/signin' />
}
