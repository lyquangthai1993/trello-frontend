import { joiResolver } from '@hookform/resolvers/joi'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Joi from 'joi'
import { Controller, useForm } from 'react-hook-form'
import { BOARD_TYPE } from '~/utils/constant'

// Define your schema verify code
const schema = Joi.object({
	title: Joi.string().required().min(3).max(50).trim().strict().messages({
		'any.required': 'This field is required',
		'string.empty': 'This filed cannot be empty'
	}),
	description: Joi.string().allow('').optional().max(256),
	type: Joi.string().valid(BOARD_TYPE.PUBLIC, BOARD_TYPE.PRIVATE).required()
})

function FormNewBoard({ createBoard }) {
	const {
		handleSubmit, control,
		formState: { errors }
	} = useForm(
		{
			resolver: joiResolver(schema)
		}
	)

	const onSubmit = (data) => {
		createBoard(data)
	}

	return (
		<Box
			component="form"
			sx={{
				display: 'flex',
				gap: 2
			}}
			onSubmit={handleSubmit(onSubmit)}>

			<FormControl
				sx={{
					mr: 1
				}}>
				<Controller
					name="title"
					control={control}
					defaultValue=""
					render={({ field }) =>
						<>
							<TextField {...field} label="Title"/>
							{errors.title &&
											<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
												{errors.title.message}
											</Typography>
							}
						</>
					}
				/>
			</FormControl>

			<FormControl
				sx={{
					mr: 1
				}}>
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field }) =>
						<>
							<TextField {...field} label="Description" multiline/>
							{errors.description &&
											<Typography variant="body2" color="error" style={{ marginTop: '5px' }}>
												{errors.description.message}
											</Typography>
							}
						</>
					}
				/>
			</FormControl>

			<FormControl
				sx={{
					mr: 1
				}}>
				<InputLabel>Type</InputLabel>
				<Controller
					name="type"
					control={control}
					defaultValue="public"
					render={({ field }) => (
						<Select {...field}>
							<MenuItem value="public">Public</MenuItem>
							<MenuItem value="private">Private</MenuItem>
						</Select>
					)}
				/>
			</FormControl>

			<Button type="submit" variant="outlined" color="secondary">Submit</Button>
		</Box>
	)
}

export default FormNewBoard
