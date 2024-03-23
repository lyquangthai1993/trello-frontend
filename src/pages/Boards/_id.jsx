import Container from '@mui/material/Container'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { createNewColumnAPI, creatNewCardAPI, fetchBoardDetailAPI } from '~/apis'
// import { mockData } from '~/apis/mock-data'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import { generatePlaceholderCard } from '~/utils/fommater'

function Board() {
  const [board, setBoard] = useState({})

  useEffect(() => {
    const boardId = '65e46e5efd6cb877bf622352'
    // console.log('boardId = ', boardId)
    fetchBoardDetailAPI(boardId)
		  .then(board => {
			  // xu li them card placeholder card
			  board.columns.forEach(column => {
				  if (isEmpty(column.cards)) {
					  const columnGenerated = generatePlaceholderCard(column)
					  column.cards.push(columnGenerated)
					  column.cardOrderIds.push(columnGenerated._id)
				  }
			  })
			  setBoard(board)
		  })

  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI(newColumnData)
    // console.log('createdColumn = ', createdColumn)

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = cloneDeep(board)
    newBoard?.columns.push(createdColumn)
    newBoard?.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await creatNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // console.log('creatNewCardAPI = ', createdCard)
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard?.columns.find(column => column._id === newCardData.columnId)

    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  return (
	  <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}>
		  <AppBar/>
		  <BoardBar board={board}/>
		  <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard}/>
	  </Container>
  )
}

export default Board
