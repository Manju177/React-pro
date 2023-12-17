import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createUser:null,
  loading:false,
  error:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state,action) => {
      state.loading=true;
    },
    signInCompleted: (state,action) => {
      state.createUser=action.payload
      state.error=null
      state.loading=false
    },
    signInError:(state,action)=>{
        state.error=action.payload;
        state.loading=false;

    }
  },
})

// Action creators are generated for each case reducer function
export const { signInStart,signInError, signInCompleted } = userSlice.actions

export default userSlice.reducer