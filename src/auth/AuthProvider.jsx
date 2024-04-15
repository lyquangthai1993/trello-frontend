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
	// console.log('AuthProvider isAuthenticated ============= ', isAuthenticated)

	// useEffect(() => {
	// 	const storedToken = localStorage.getItem('token')
	// 	const storedRefreshToken = localStorage.getItem('refreshToken')||''
	// 	// console.log('storedToken = ', storedToken)
	// 	// console.log('storedRefreshToken = ', storedRefreshToken)
	//
	// 	if (storedToken) {
	// 		dispatch(setToken({
	// 			token: storedToken,
	// 			refreshToken: storedRefreshToken,
	// 			isAuthenticated: true
	// 		}))
	// 	}
	// }, [dispatch])

	const value = {
		token,
		isAuthenticated,
		logout: () => dispatch(logout()),
		setToken: (authToken) => {
			console.log('=============== dispatch authToken = ', authToken)
			dispatch(setToken(authToken))
		}
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
