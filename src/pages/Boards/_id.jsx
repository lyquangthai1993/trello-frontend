import { CircularProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { createNewColumnAPI, creatNewCardAPI, fetchBoardDetailAPI, updateBoardDetailAPI, updateColumnDetailAPI } from '~/apis'
// import { mockData } from '~/apis/mock-data'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import { generatePlaceholderCard } from '~/utils/fommater'
import { mapOrder } from '~/utils/sorts'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65e46e5efd6cb877bf622352'
    // console.log('boardId = ', boardId)
    fetchBoardDetailAPI(boardId)
		  .then(board => {
			  // sap xep lai column va card theo thu tu de dem vao component con
			  board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

			  // xu li them card placeholder card khi column bi empty card
			  board.columns.forEach(column => {
				  if (isEmpty(column.cards)) {
					  const columnGenerated = generatePlaceholderCard(column)
					  column.cards.push(columnGenerated)
					  column.cardOrderIds.push(columnGenerated._id)
				  } else {
					  // sap xep lai column va card theo thu tu de dem vao component con
					  column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
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

  const moveColumns = async (dndOrderedColumns) => {
    // cap nhat state cho chuan state cua board
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // call api update columnOrderIds board
    await updateBoardDetailAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }

  // ham xu ly move card trong cung column
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard?.columns.find(column => column._id === columnId)

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // goi api update column
    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const deleteColumn = async () => {
    // const columnDeleted = await deleteColumnAPI(columnId)

  }

  if (!board) return <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '100vw',
    height: '100vh'
  }}>
    <CircularProgress/>
    <Typography>Loadding board...</Typography>
  </Box>

  return (
	  <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}>
		  <AppBar/>
		  <BoardBar board={board}/>
		  <BoardContent board={board}
        createNewColumn={createNewColumn}
        moveColumns={moveColumns}
        deleteColumn={deleteColumn}
        createNewCard={createNewCard}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
		  />
	  </Container>
  )
}

export default Board
