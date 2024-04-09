import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthPage from '~/auth/AuthPage'
import ProtectedRoute from '~/auth/ProtectedRoute'
import NotFoundPage from '~/pages/NotFoundPage/NoteFoundPage'
import Board from './pages/Boards/_id'

export default function App() {
	const isAuthenticated = !!localStorage.getItem('token')

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<AuthPage/>}/>
				<Route
					path="/"
					element={
						<ProtectedRoute user={isAuthenticated}>
							<Board/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/boards"
					element={
						<ProtectedRoute user={isAuthenticated}>
							<Board/>
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFoundPage/>}/> {/* 404 route */}
			</Routes>
		</Router>
	)
}
