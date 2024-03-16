import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.light',
      with: '100%', height: (theme) => `${theme.trelloCutom.boardBarHeight}`,
      display: 'flex', alignItems: 'center'
    }}>
      BARRRRR
    </Box>
  )
}

export default BoardBar
