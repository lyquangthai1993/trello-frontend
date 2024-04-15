import { Navigate } from 'react-router-dom'
import { useAuth } from '~/auth/UseAuth'

const ProtectedRoute = ({ isAuthenticated, children }) => {
	const { isAuthenticated: authIsAuthenticated } = useAuth()

	if (!isAuthenticated || !authIsAuthenticated) {
		return <Navigate to="/login" replace/>
	}

	return children
}

export default ProtectedRoute
