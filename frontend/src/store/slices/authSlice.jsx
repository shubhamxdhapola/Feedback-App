import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({

    name: 'auth',  
    initialState: { 
        isAuthenticated : false,
        username : null
    },
    reducers: {
        register: (state, action) => {
            state.isAuthenticated = true
            state.username = action.payload.username
        },
        login : (state, action) => {
            state.isAuthenticated = true
            state.username = action.payload.username
        },
        logout : state => {
            state.isAuthenticated = false
            state.username = null
        },
        checkAuth : (state, action) => {
            state.isAuthenticated = true,
            state.username = action.payload.username
        }
    }
})

export const { register, login, logout, checkAuth } = authSlice.actions
export default authSlice.reducer


