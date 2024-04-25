import { AddCard, Person, Public } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBoardAPI, fetchBoardsAPI } from '~/apis'
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner'
// import { useAuth } from '~/auth/UseAuth'
import FormNewBoard from '~/pages/Boards/FormNewBoard'
import { logout } from '~/redux/authSlice'

function Boards() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [boards, setBoards] = useState([])
	const [loadingSpinner, setLoadingSpinner] = useState(false)

	// const { user } = useAuth()
	const [openNewBoardForm, setOpenNewBoardForm] = useState(false)

	const toggleNewBoardForm = () => setOpenNewBoardForm(!openNewBoardForm)

	const handleCreateBoard = (data) => {
		createBoardAPI(data)
			.then((newBoard) => {
				setBoards([newBoard, ...boards])
				toggleNewBoardForm()
			})
	}
	useEffect(() => {
		setLoadingSpinner(true)
		fetchBoardsAPI()
			.then(data => setBoards(data.data))
			.catch(() => {
				setBoards([])
			})
			.finally(() => {
				setLoadingSpinner(false)
			})
	}, [])
	return (
		<Container
			disableGutters={true}
			// maxWidth={false}
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 2
			}}>

			{loadingSpinner && <LoadingSpinner/>}

			<Typography variant="h4" component="div" gutterBottom>
				Boards
			</Typography>

			<Grid container spacing={3}>
				{boards.map(board => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={board._id}>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								cursor: 'pointer',
								border: (theme) => `1px solid ${theme.palette.primary.main}`
							}}
							onClick={() => {
								navigate(`/board/${board._id}`)
							}}>
							<CardContent>
								<Typography variant="h5" component="div" color="text.primary">
									{board?.title}
								</Typography>
								<Typography variant="body2">
									{board?.description}
								</Typography>
								<IconButton aria-label="Type">
									{board?.type === 'public' ? <Public/> : <Person/>}
								</IconButton>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Button startIcon={<AddCard/>} onClick={toggleNewBoardForm}>Add new board</Button>

			{openNewBoardForm ? <FormNewBoard createBoard={handleCreateBoard} toggleNewBoardForm={toggleNewBoardForm}/> : <></>}

			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					dispatch(logout())
				}}
			>
				Logout
			</Button>
		</Container>
	)
}

export default Boards
