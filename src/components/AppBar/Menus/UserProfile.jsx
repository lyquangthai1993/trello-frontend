import { ExpandMore } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PositionedMenu() {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<Button
				id="basic-menu-workspaces"
				aria-controls={open ? 'basic-menu-workspaces' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<ExpandMore/>}
				sx={{
					color: 'white'
				}}
			>
				User
			</Button>
			<Menu
				id="basic-menu-workspaces"
				aria-labelledby="basic-menu-workspaces"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={() => {
					localStorage.clear('token')
					localStorage.clear('refreshToken')
					navigate('/login')
				}}>Logout</MenuItem>
			</Menu>
		</div>
	)
}
