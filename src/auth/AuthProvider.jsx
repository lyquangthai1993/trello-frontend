import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setToken } from '~/redux/authSlice'

export const AuthContext = createContext({
	isAuthenticated: !!localStorage.getItem('token'),
	token: null,
	refreshToken: null
})

export function AuthProvider({ children }) {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

	const value = {
		token,
		isAuthenticated,
		logout: () => dispatch(logout()),
		setToken: (authToken) => {
			dispatch(setToken(authToken))
		}
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
