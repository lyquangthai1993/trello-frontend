import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: !!localStorage.getItem('token'),
	token: localStorage.getItem('token'),
	refreshToken: localStorage.getItem('refreshToken')
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('refreshToken', action.payload.refreshToken)

			state.token = action.payload.token
			state.refreshToken = action.payload.refreshToken
			state.isAuthenticated = true
		},
		logout: (state) => {
			localStorage.clear('token')
			localStorage.clear('refreshToken')

			state.token = null
			state.refreshToken = null
			state.isAuthenticated = false
		}
	}
})

export const { setToken, logout } = authSlice.actions

export default authSlice.reducer
