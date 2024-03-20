import { defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column'
import Card from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

const ACTIVE_DRAG_ITEM_TYPE = {
  'COLUMN': 'COLUMN', 'CARD': 'CARD'
}

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
      delay: 250, tolerance: 500
    }
  })

  // const sesnors = useSensors(pointerSensor)
  const sesnors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  // no-unused-vars
  const [, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // useEffect(() => {
  //   console.log('activeDragItemId = ', activeDragItemId)
  //   console.log('activeDragItemType = ', activeDragItemType)
  //   console.log('activeDragItemData = ', activeDragItemData)
  // }, [activeDragItemId, activeDragItemType, activeDragItemData])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    // console.log('event start = ', event)
    const {
      active: {
        data
      }
    } = event
    setActiveDragItemId(data?.current?._id)
    setActiveDragItemType(data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(data?.current)
  }

  const handleDragOver = (event) => {
    // console.log('event over = ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // console.log('keo tha column, khong lam gi them')
      return false
    }

    const { active, over } = event
    // nếu không có over, active thì return do kéo linh tinh ra ngoài
    if (!over || !active) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    // console.log('overCardId: ', overCardId)

    // tim 2 cai columns theo id
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log('activeColumn = ', activeColumn)
    // console.log('overColumn = ', overColumn)

    if (!activeColumn || !overColumn) return false

    // kiem tra 2 column nay khac nhau thi moi thuc hien update o hai column khac nhau nay
    if (activeColumn?._id !== overColumn?._id) {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        // console.log('newCardIndex: ', newCardIndex)
        // console.log('prevColumns: ', prevColumns)

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // nextActiveColumn: column cũ
        if (nextActiveColumn) {
          // filter mang cards o column cu, loai tru activeDraggingCardId ra
          nextActiveColumn.cards = nextActiveColumn?.cards?.filter(card => card._id !== activeDraggingCardId)

          // cap nhat mang cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.filter(card => card._id)
          nextActiveColumn.thai = 'deptrai'
        }

        // nextOverColumn: column mới
        if (nextOverColumn) {
          // kiem tra xem card dang keo vao no co ton tai trong nextOverColumn.cards hay khong, neu co xoa no truoc
          nextOverColumn.cards = nextOverColumn?.cards?.filter(card => card._id !== activeDraggingCardId)

          // column over se bo sung vao mang cards cua no theo vi tri newCardIndex
          nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIndex, 0, activeDraggingCardData)

          // cap nhat mang cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn?.cards?.filter(card => card._id)
        }
        // console.log('nextColumns = ', nextColumns)
        return nextColumns
      })
    }

    // if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
    //
    // }
  }
  const handleDragEnd = (event) => {
    // console.log('event end = ', event)
    const { active, over } = event

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('keo tha card, khong lam gi them')
      return false
    }

    // nếu không có over thì return do kéo linh tinh ra ngoài
    if (!over || !active) return

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


    // set các giá trị về null sau khi drag end
    setActiveDragItemType(null)
    setActiveDragItemId(null)
    setActiveDragItemData(null)
  }
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ style: { active: { opacity: '0.5' } } })
  }
  return (<DndContext
    sensors={sesnors}
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDragEnd={handleDragEnd}
  >
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'), with: '100%', height: (theme) => theme.trelloCutom.boardContentHeight, display: 'flex', p: '10px 0'
    }}>
      <ListColumns columns={orderedColumns}/>
      <DragOverlay dropAnimation={customDropAnimation}>
        {!activeDragItemType && null}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData}/>}
        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData}/>}
      </DragOverlay>
    </Box>
  </DndContext>)
}

export default BoardContent
