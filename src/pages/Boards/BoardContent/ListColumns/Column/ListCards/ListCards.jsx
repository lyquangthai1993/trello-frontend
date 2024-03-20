import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Card from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(card => card._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
          ${theme.trelloCutom.boardContentHeight} -
          ${theme.spacing(5)} -
          ${theme.trelloCutom.columnHeaderHeight} -
          ${theme.trelloCutom.columnFooterHeight})`,
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da'
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {cards?.map((card) => <Card temporaryHideMedia key={card._id} card={card}/>)}

      </Box>
    </SortableContext>
  )
}

export default ListCards

