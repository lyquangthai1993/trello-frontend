import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { NoteAdd } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column'

function ListColumns({ columns }) {
  /*
  Sortable context: https://dndkit.com/docs/sortable-context
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
          <Column key={column._id} column={column}/>
        ))}

        <Box
          variant="outlined"
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
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
          }} startIcon={<NoteAdd/>}>Add new column</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
