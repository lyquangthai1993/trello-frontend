import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { fetchBoardsAPI } from '~/apis'

function Boards() {
	const [boards, setBoards] = useState([])
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
			{boards.map(board => (
				<Card key={board._id} sx={{ minWidth: 275, marginBottom: 2 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							{board.title}
						</Typography>
					</CardContent>
				</Card>
			))}
		</Container>
	)
}

export default Boards
