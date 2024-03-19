import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'


function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10// chuot di chuyen 10px moi bat dau drag
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10// chuot di chuyen 10px moi bat dau drag
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })

  // const sesnors = useSensors(pointerSensor)
  const sesnors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    // nếu không có over thì return do kéo linh tinh ra ngoài
    if (!over) return

    // nếu vị trí trước và sau không giống nhau thì mới thực hiện update
    if (active.id !== over.id) {
      // lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex(column => column._id === active.id)

      // lấy vị trí mới từ over
      const newIndex = orderedColumns.findIndex(column => column._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // se call api update orderColumnsIds cho board sau khi drag xong
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext sensors={sesnors} onDragEnd={handleDragEnd}>
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
