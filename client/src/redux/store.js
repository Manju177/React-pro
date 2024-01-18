import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './user/user.slice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';



const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, useReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare({
    serializableCheck:false
  })
})


export const persistor = persistStore(store)