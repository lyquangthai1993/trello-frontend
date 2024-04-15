import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthPage from '~/auth/AuthPage'
import ProtectedRoute from '~/auth/ProtectedRoute'
import { useAuth } from '~/auth/UseAuth'
import Board from '~/pages/Boards/_id'
import NotFoundPage from '~/pages/NotFoundPage/NoteFoundPage'

import BoardList from './pages/Boards/Boards'

export default function App() {
	const { isAuthenticated } = useAuth()
	// console.log('App isAuthenticated ============================ ', isAuthenticated)
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<BoardList/>
						</ProtectedRoute>
					}
				/>

				<Route
					path="/board/:id"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<Board/>
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<AuthPage/>}/>
				<Route path="*" element={<NotFoundPage/>}/> {/* 404 route */}
			</Routes>
		</Router>
	)
}
