import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { Controller, useForm } from 'react-hook-form'

function FormNewBoard({ createBoard }) {
	const { handleSubmit, control } = useForm()

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
			<Controller
				name="title"
				control={control}
				defaultValue=""
				render={({ field }) => <TextField {...field} label="Title"/>}
			/>
			<Controller
				name="description"
				control={control}
				defaultValue=""
				render={({ field }) => <TextField {...field} label="Description" multiline/>}
			/>
			<FormControl>
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
			<Button type="submit">Submit</Button>
		</Box>
	)
}

export default FormNewBoard
