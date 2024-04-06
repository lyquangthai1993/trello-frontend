import { joiResolver } from '@hookform/resolvers/joi'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import bcrypt from 'bcryptjs'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { loginAPI } from '~/apis'

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
					Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

// Define your schema
const schema = Joi.object({
	email: Joi.string().email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.empty': 'Email is required',
			'string.email': 'Email must be a valid email address'
		}),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,}$'))
		.required()
		.messages({
			'string.pattern.base': 'Password must be at least 6 characters',
			'string.empty': 'Password is required'
		})

})

export default function SignInSide({ toggleSignUp }) {
	const {
		register, handleSubmit,
		setError,
		formState: { errors }
	} = useForm({
		resolver: joiResolver(schema)
	})

	const onSubmit = async (data) => {
		// data.password = bcrypt.hashSync(data.password, 10)

		// console.log('data = ', data)
		loginAPI(data)
			.then((res) => {
				// TODO: continue here
				console.log('🚀 ~ file: Login.jsx:64 ~ .then ~ res:', res)
			})
			.catch((error) => {
				// TODO: write response from API to mapping here
				if (error.response && error.response.data) {

					// assuming error.response.data is an object mapping field names to error messages
					for (const field in error?.response?.data?.fields) {

						setError(
							field,
							{
								type: 'manual',
								message: error?.response?.data?.fields?.[field]
							})


					}
				}
			})
	}

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
							Sign in
					</Typography>
					<Box component="form"
								 sx={{
									 mt: 1,
									 width: '100%'
								 }}
								 onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							{...register('email')}
							margin="normal"
							// required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							// type="email"
							autoComplete="email"
							autoFocus
							error={Boolean(errors.email)}
							sx={{
								color:''
							}}
						/>
						{errors.email &&
									<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
										{errors.email.message}
									</Typography>
						}

						<TextField
							{...register('password')}
							margin="normal"
							// required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={Boolean(errors.password)}
						/>
						{errors.password &&
									<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
										{errors.password.message}
									</Typography>
						}

						<FormControlLabel
							control={<Checkbox value="remember" color="primary"/>}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
								Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
										Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2" onClick={toggleSignUp}>
									{'Don\'t have an account? Sign Up'}
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{ mt: 5 }}/>
					</Box>
				</Box>
			</Grid>
		</Grid>

	)
}
