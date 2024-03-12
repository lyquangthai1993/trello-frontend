import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      with: '100%', height: (theme) => `calc(100vh - ${theme.trelloCutom.appBarHeight} - ${theme.trelloCutom.boardBarHeight})`,
      display: 'flex', alignItems: 'center'
    }}>
      Board Content
    </Box>
  )
}

export default BoardContent
