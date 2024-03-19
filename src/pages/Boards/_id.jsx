import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65e46e5efd6cb877bf622352'
    fetchBoardDetailAPI(boardId)
      .then(data => {
        setBoard(data)
      })
    // setBoard(res)
  }, [])

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}>
      <AppBar/>
      <BoardBar board={mockData?.board}/>
      <BoardContent board={mockData?.board}/>
    </Container>
  )
}

export default Board
