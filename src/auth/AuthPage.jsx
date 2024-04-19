import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignInPage from '~/auth/Login'
import SignUpPage from '~/auth/Register'
import { useAuth } from '~/auth/UseAuth'

function AuthPage() {
	const navigate = useNavigate()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated, navigate])
	const [isSignUpping, setIsSignUpping] = useState(false)
	const toggleSignUp = () => setIsSignUpping(!isSignUpping)
	return (
		isSignUpping ? <SignUpPage toggleSignUp={toggleSignUp}/> : <SignInPage toggleSignUp={toggleSignUp}/>
	)
}

export default AuthPage
