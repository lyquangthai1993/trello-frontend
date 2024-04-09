import {joiResolver} from '@hookform/resolvers/joi';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Joi from 'joi';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {registerAPI} from '~/apis';

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

// Define your schema verify code
const schema = Joi.object({
	first_name: Joi.string().required().min(1).trim().strict(),
	last_name: Joi.string().required().min(1).trim().strict(),
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

export default function SignUp({
								   toggleSignUp
							   }) {

	const {
		register, handleSubmit,
		setError,
		formState: { errors }
	} = useForm({
		resolver: joiResolver(schema)
	})
	const onSubmit = (data) => {
		registerAPI(data)
			.then(() => {
				toast.success('Register successfully', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				// switch to login page
				toggleSignUp()


			})
			.catch((error) => {
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
	  <Container component="main" maxWidth="xs">

		  <Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
		  >
			  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				  <LockOutlinedIcon/>
			  </Avatar>
			  <Typography component="h1" variant="h5">
				  Sign up
			  </Typography>
				<Box component="form" sx={{ mt: 3, width: '100%' }}
						 onSubmit={handleSubmit(onSubmit)}
				>
				  <Grid container spacing={2}>
					  <Grid item xs={12} sm={6}>
						  <TextField
								{...register('first_name')}
								autoComplete="given-name"
								name="first_name"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								error={Boolean(errors.first_name)}
						  />
							{errors.first_name &&
									<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
										{errors.first_name.message}
									</Typography>
							}
					  </Grid>
					  <Grid item xs={12} sm={6}>
						  <TextField
								{...register('last_name')}
								name="last_name"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								autoComplete="family-name"
								error={Boolean(errors.last_name)}
						  />
							{errors.last_name &&
									<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
										{errors.last_name.message}
									</Typography>
							}
					  </Grid>
					  <Grid item xs={12}>
						  <TextField
								{...register('email')}
								name="email"
								required
								fullWidth
								id="email"
								label="Email Address"
								autoComplete="email"
								error={Boolean(errors.email)}
						  />
							{errors.email &&
									<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
										{errors.email.message}
									</Typography>
							}
					  </Grid>
					  <Grid item xs={12}>
						  <TextField
								{...register('password')}
								name="password"
								required
								fullWidth
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								error={Boolean(errors.password)}
						  />
							{errors.password &&
									<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
										{errors.password.message}
									</Typography>
							}
					  </Grid>
					  <Grid item xs={12}>
						  <FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary"/>}
								label="I want to receive inspiration, marketing promotions and updates via email."
						  />
					  </Grid>
				  </Grid>
				  <Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
				  >
					  Sign Up
				  </Button>
				  <Grid container justifyContent="flex-end">
					  <Grid item>
						  <Link href="#" variant="body2" onClick={toggleSignUp}>
							  Already have an account? Sign in
						  </Link>
					  </Grid>
				  </Grid>
			  </Box>
		  </Box>
		  <Copyright sx={{ mt: 5 }}/>
	  </Container>
	)
}
