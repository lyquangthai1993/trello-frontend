import { useState } from 'react'
import SignInSide from '~/auth/Login'
import SignUp from '~/auth/Register'

function AuthPage() {
    const [isSignUpping, setIsSignUpping] = useState(false)
    const toggleSignUp = () => setIsSignUpping(!isSignUpping)
    return (
	  isSignUpping ? <SignUp toggleSignUp={toggleSignUp}/> : <SignInSide toggleSignUp={toggleSignUp}/>
    )
}

export default AuthPage
