import { DndContext } from '@dnd-kit/core'
import Box from '@mui/material/Box'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'


function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <DndContext>
      <Box sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        with: '100%', height: (theme) => theme.trelloCutom.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent
