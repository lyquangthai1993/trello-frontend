import { AddCard } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBoardAPI, fetchBoardsAPI } from '~/apis'
import FormNewBoard from '~/pages/Boards/FormNewBoard'
import { logout } from '~/redux/authSlice'

function Boards() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [boards, setBoards] = useState([])

	const [openNewBoardForm, setOpenNewBoardForm] = useState(false)

	const toggleNewBoardForm = () => setOpenNewBoardForm(!openNewBoardForm)

	const handleCreateBoard = (data) => {
		createBoardAPI(data)
			.then((newBoard) => {
				setBoards([newBoard.data, ...boards])
			})
	}
	useEffect(() => {
		fetchBoardsAPI()
			.then(data => setBoards(data.data))
			.catch(() => {
				setBoards([])
			})
	}, [])
	return (
		<Container
			disableGutters={true}
			maxWidth={false}
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 2
			}}>
			<Typography variant="h4" component="div" gutterBottom>
					Board List
			</Typography>

			<Box sx={{
				maxHeight: '50vh',
				overflow: 'auto',
				padding: '5px',
				margin: '-5px'
			}}>
				{boards.map(board => (
					<Card key={board._id}
						sx={{
							minWidth: 275, marginBottom: 2, cursor: 'pointer',
							border: (theme) => `1px solid ${theme.palette.primary.main}`
						}}
						onClick={() => {
							navigate(`/board/${board._id}`)
						}}>
						<CardContent>
							<Typography variant="h5" component="div">
								{board.title}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
			<Button startIcon={<AddCard/>} onClick={toggleNewBoardForm} createBoard={handleCreateBoard}>Add new board</Button>
			{openNewBoardForm ? <FormNewBoard toggleNewBoardForm={toggleNewBoardForm}/> : <></>}
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