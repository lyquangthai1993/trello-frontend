import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Close, NoteAdd } from '@mui/icons-material'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { toast } from 'react-toastify'
// import { createNewColumnAPI } from '~/apis'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column'

function ListColumns({ columns, boardId, createNewColumn, createNewCard, deleteColumn }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const addNewColumn = () => {
    // call api
    // add new column to columns
    // close form
    if (newColumnTitle.trim() === '') {
      toast.error('Column title is required', {
        position: 'top-right'
      })
      return
    }

    const newColumnData = {
      title: newColumnTitle,
      boardId
    }

    createNewColumn(newColumnData)

    toggleNewColumnForm()
    setNewColumnTitle('')
  }


  /* Sortable context: https://dndkit.com/docs/sortable-context
			  phải parse _id của column thành string để tránh lỗi: "The provided id must be a string or a number."
		  */
  return (
	  <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
		  <Box
        sx={{
          bgcolor: 'inherit',
          display: 'flex',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}>

			  {columns?.map((column) => (
          <Column key={column._id}
            column={column}
            deleteColumn={deleteColumn}
            createNewCard={createNewCard}
          />
			  ))}

			  {!openNewColumnForm ?
          (<Box
				  variant="outlined"
				  onClick={toggleNewColumnForm}
				  sx={{
					  minWidth: '250px',
					  maxWidth: '250px',
					  mx: 2,
					  borderRadius: '6px',
					  height: 'fit-content',
					  bgcolor: '#ffffff3d'
				  }}>

            <Button sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'start',
              pl: 2.5,
              py: 1
            }} startIcon={<NoteAdd/>}
            >
						Add new column
            </Button>
          </Box>)
          :
          (<Box
				  variant="outlined"
				  sx={{
					  minWidth: '250px',
					  maxWidth: '250px',
					  mx: 2,
					  p: 1,
					  borderRadius: '6px',
					  height: 'fit-content',
					  bgcolor: '#ffffff3d',
					  display: 'flex',
					  flexDirection: 'column',
					  gap: 1
				  }}>

            <TextField
					  label="Enter column title"
					  type="text"
					  size={'small'}
					  variant={'outlined'}
					  autoFocus
					  value={newColumnTitle}
					  onChange={e => setNewColumnTitle(e.target.value)}
					  onKeyPress={(e) => {
						  if (e.key === 'Enter') {
							  e.preventDefault()
							  addNewColumn()
						  }
					  }}
					  sx={{
						  '& label': { color: 'white' },
						  '& input': { color: 'white' },
						  '& label.Mui-focused': { color: 'white' },
						  '& .MuiOutlinedInput-root': {
							  '& fieldset': { borderColor: 'white' },
							  '&:hover fieldset': { borderColor: 'white' },
							  '&.Mui-focuced fieldset': { borderColor: 'white' }
						  }
					  }}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
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
						  onClick={addNewColumn}
              >Add column</Button>
              <Close
						  fontSize={'small'}
						  sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.light } }}
						  onClick={toggleNewColumnForm}
              />
            </Box>
          </Box>)
			  }

		  </Box>
	  </SortableContext>
  )
}

export default ListColumns
