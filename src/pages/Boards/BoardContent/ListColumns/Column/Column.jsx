import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AddCard, Close, Cloud, DeleteForever, DragHandle, ExpandMore } from '@mui/icons-material'
import { ListItemIcon, ListItemText, TextField, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ListCards from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards'

function Column({ column, createNewCard, deleteColumn }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: column._id,
		data: { ...column }
	})
	const dndKitColumnStyles = {
		// touchAction: 'none',
		// nếu sử dụng transform: CSS.Transform sẽ lỗi dạng stretch column
		// github issue: https://github.com/clauderic/dnd-kit/issues/117
		transform: CSS.Translate.toString(transform),
		transition,
		height: '100%',
		opacity: isDragging ? 0.5 : undefined

	}

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	// const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
	const orderedCards = column?.cards

	const [openNewCardForm, setOpenNewCardForm] = useState(false)
	const [newCardTitle, setNewCardTitle] = useState('')
	const toggleNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
	const addNewCard = () => {
		// call api
		// add new column to columns
		// close form
		if (newCardTitle.trim() === '') {
			toast.error('Column title is required', {
				position: 'top-right'
			})
			return
		}
	  createNewCard({
		  columnId: column._id,
		  title: newCardTitle.trim()
	  })
		toggleNewCardForm()
		setNewCardTitle('')
	}

	const handleDeleteColumn = (columnId) => {
		deleteColumn(columnId)
	}

	return (
	  <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes} >
		  <Box
				sx={{
					minWidth: '300px',
					maxWidth: '300px',
					bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
					ml: 2,
					borderRadius: '6px',
					height: 'fit-content',
					maxHeight: (theme) => `calc(${theme.trelloCutom.boardContentHeight} - ${theme.spacing(5)})`
				}}
				{...listeners}
		  >
			  <Box sx={{
				  height: (theme) => theme.trelloCutom.columnHeaderHeight,
				  p: 2,
				  display: 'flex',
				  alignItems: 'center',
				  justifyContent: 'space-between'
			  }}>
				  <Typography
						variant={'h6'}
						sx={{
							fontSize: '1rem',
							fontWeight: 'bold',
							cursor: 'pointer'
						}}
				  >{column.title}
				  </Typography>
				  <Box>
					  <Tooltip title={'More option'}>
						  <ExpandMore
								sx={{ color: 'text.primary', cursor: 'pointer' }}
								id="basic-column-dropdown"
								aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
						  />
					  </Tooltip>

					  <Menu
							id="basic-menu-column-dropdown"
							aria-labelledby="basic-column-dropdown"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
			  onClick={handleClose}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
					  >
						  <MenuItem onClick={() => handleDeleteColumn(column?._id)}>
							  <ListItemIcon><DeleteForever fontSize={'small'}/></ListItemIcon>
							  <ListItemText>Remove</ListItemText>
						  </MenuItem>
						  <MenuItem onClick={handleClose}>
							  <ListItemIcon><Cloud fontSize={'small'}/></ListItemIcon>
							  <ListItemText>Archive</ListItemText>
						  </MenuItem>
					  </Menu>
				  </Box>
			  </Box>


			  <ListCards cards={orderedCards}/>

			  <Box sx={{
				  height: (theme) => theme.trelloCutom.columnFooterHeight,
				  p: 1
			  }}>
				  {!openNewCardForm ?
						<Box sx={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}>
							<Button startIcon={<AddCard/>} onClick={toggleNewCardForm}>Add new card</Button>
							<Tooltip title={'Drag to move'}>
								<DragHandle sx={{ cursor: 'pointer' }}/>
							</Tooltip>
						</Box>
						:
						<Box sx={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: 1
						}}>
							<TextField
						  label="Enter card title"
						  type="text"
						  size={'small'}
						  variant={'outlined'}
						  autoFocus
						  value={newCardTitle}
						  onChange={e => setNewCardTitle(e.target.value)}
						  onKeyPress={(e) => {
							  if (e.key === 'Enter') {
								  e.preventDefault()
								  addNewCard()
							  }
						  }}
						  sx={{
							  '& label': { color: (theme) => theme.palette.primary.main },
							  '& input': { color: (theme) => theme.palette.primary.main },
							  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
							  '& .MuiOutlinedInput-root': {
								  '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
								  '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
								  '&.Mui-focuced fieldset': { borderColor: (theme) => theme.palette.primary.main }
							  }
						  }}
							/>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<Button
							  variant={'contained'}
							  color={'success'}
							  size={'small'}
							  sx={{
								  boxShadow: 'none',
								  border: '0.5px solid',
								  borderColor: (theme) => theme.palette.success.main,
								  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
							  }}
							  onClick={addNewCard}>Add</Button>
								<Close
							  fontSize={'small'}
							  sx={{ color: (theme) => theme.palette.warning.light, cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.light } }}
							  onClick={toggleNewCardForm}
								/>
							</Box>
						</Box>
				  }

			  </Box>
		  </Box>
	  </div>
	)
}

export default Column
