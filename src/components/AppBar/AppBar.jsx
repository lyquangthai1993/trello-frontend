import {Close, Search} from '@mui/icons-material';
import Apps from '@mui/icons-material/Apps';
import {InputAdornment, SvgIcon, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {useState} from 'react';
import {ReactComponent as Logo} from '~/assets/slack.svg';
import UserProfile from '~/components/AppBar/Menus/UserProfile';
import WorkSpace from '~/components/AppBar/Menus/WorkSpace';
import ModeSelect from '~/components/ModeSelect/ModeSelect';

function AppBar() {
	const [searchValue, setSearchValue] = useState('')
	return (
		<Box sx={{
			with: '100%', height: (theme) => `${theme.trelloCutom.appBarHeight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, padding: 2,
			overflowX: 'auto',
			overflowY: 'hidden',
			bgcolor: theme => theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
		}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Link href={'/'} sx={{ alignSelf: 'center', lineHeight: '1' }}>
					<Apps sx={{ color: 'white' }}/>
				</Link>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
					<SvgIcon component={Logo} inheritViewBox fontSize="small" sx={{ color: 'white' }}/>
					<Typography variant="span" sx={{ fontSize: '1.2', color: 'white' }}>Trello</Typography>
				</Box>

				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<WorkSpace/>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<TextField
					id="outline-search"
					label="Search..."
					type="text"
					size={'small'}
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search sx={{ color: 'white' }}/>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<Close fontSize={'small'}
														 sx={{
															 color: 'white',
															 cursor: 'pointer'
														 }}
														 onClick={() => setSearchValue('')}
								/>
							</InputAdornment>
						)
					}}
					sx={{
						minWidth: 120,
						maxWidth: 180,
						'& label': {
							color: 'white'
						},
						'& input': {
							color: 'white'
						},
						'& label.Mui-focused': {
							color: 'white'
						},
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'white'
							},
							'&:hover fieldset': {
								borderColor: 'white'
							},
							'&.Mui-focuced fieldset': {
								borderColor: 'white'
							}
						}
					}}
				/>
				<ModeSelect/>
				<UserProfile/>

			</Box>
		</Box>
	)
}

export default AppBar
