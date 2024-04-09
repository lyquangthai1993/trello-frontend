import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignInSide from '~/auth/Login'
import SignUp from '~/auth/Register'

function AuthPage() {
	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/')
		}
	}, [navigate])
	const [isSignUpping, setIsSignUpping] = useState(false)
	const toggleSignUp = () => setIsSignUpping(!isSignUpping)
	return (
	  isSignUpping ? <SignUp toggleSignUp={toggleSignUp}/> : <SignInSide toggleSignUp={toggleSignUp}/>
	)
}

export default AuthPage
