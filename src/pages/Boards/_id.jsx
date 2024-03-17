import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent'

function Board() {
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}>
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
    </Container>
  )
}

export default Board
