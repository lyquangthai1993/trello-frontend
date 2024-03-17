import Box from '@mui/material/Box'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns'


function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      with: '100%', height: (theme) => theme.trelloCutom.boardContentHeight,
      display: 'flex',
      p: '10px 0'
    }}>
      <ListColumns/>
    </Box>
  )
}

export default BoardContent
