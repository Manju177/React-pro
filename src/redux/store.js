import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './user/user.slice'

export const store = configureStore({
  reducer: {user:useReducer},
  middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare({
    serializableCheck:false
  })
})