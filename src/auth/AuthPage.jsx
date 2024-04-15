import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignInSide from '~/auth/Login'
import SignUp from '~/auth/Register'
import { useAuth } from '~/auth/UseAuth'

function AuthPage() {
	const navigate = useNavigate()
	const { isAuthenticated } = useAuth()
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])
	const [isSignUpping, setIsSignUpping] = useState(false)
	const toggleSignUp = () => setIsSignUpping(!isSignUpping)
	return (
	  isSignUpping ? <SignUp toggleSignUp={toggleSignUp}/> : <SignInSide toggleSignUp={toggleSignUp}/>
	)
}

export default AuthPage
