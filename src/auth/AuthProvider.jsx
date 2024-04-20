import {createContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout, setCurrentUser, setToken} from '~/redux/authSlice';

export const AuthContext = createContext({
	isAuthenticated: !!localStorage.getItem('token'),
	token: null,
	refreshToken: null,
	user: null
})

export function AuthProvider({ children }) {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const user = useSelector((state) => state.auth.user)
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

	const value = {
		user,
		token,
		isAuthenticated,
		logout: () => dispatch(logout()),
		setCurrentUser: (user) => dispatch(setCurrentUser(user)),
		setToken: (authToken) => {
			dispatch(setToken(authToken))
		}
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
