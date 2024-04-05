import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NotFoundPage = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			bgcolor="grey.200"
		>
			<Typography variant="h1" fontSize="4rem" fontWeight="bold" color="grey.700">
					404
			</Typography>
			<Typography variant="h4" fontSize="1.5rem" color="grey.500">
					Page not found!
			</Typography>
		</Box>
	)
}

export default NotFoundPage
