import { closestCorners, defaultDropAnimationSideEffects, DndContext, DragOverlay, getFirstCollision, MouseSensor, pointerWithin, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import Column from '~/pages/Boards/BoardContent/ListColumns/Column/Column'
import Card from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'
import ListColumns from '~/pages/Boards/BoardContent/ListColumns/ListColumns'
import { generatePlaceholderCard } from '~/utils/fommater'
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
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // điểm va chạm cuối cùng, thuật toán xử lí phát hiện va chạm
  const lastOverId = useRef(null)

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

  const moveCardBetweenDifferenceColumns = (overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex

      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

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

        // thêm placeholder card vào column cũ nếu column cũ không còn card nào
        if (isEmpty(nextActiveColumn?.cards)) {
          // console.log('card cuoi cung bi keo di')
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // cap nhat mang cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.map(card => card._id)
      }
      // console.log('nextColumns = ', nextColumns)

      // nextOverColumn: column mới
      if (nextOverColumn) {
        // kiem tra xem card dang keo vao no co ton tai trong nextOverColumn.cards hay khong, neu co xoa no truoc
        nextOverColumn.cards = nextOverColumn?.cards?.filter(card => card._id !== activeDraggingCardId)

        // phải cập nhật lại columnId cho đúng chuẩn data khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData, columnId: nextOverColumn._id
        }

        // column over se bo sung vao mang cards cua no theo vi tri newCardIndex
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // cap nhat mang cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(card => card._id)
      }
      // console.log('nextColumns = ', nextColumns)
      return nextColumns
    })
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

    // neu la keo card thi thuc hien hanh dong set old column
    if (data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
      moveCardBetweenDifferenceColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }

  }
  const handleDragEnd = (event) => {
    // console.log('event end = ', event)
    const { active, over } = event

    // nếu không có over thì return do kéo linh tinh ra ngoài
    if (!over || !active) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const {
        id: activeDraggingCardId, data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      // tim 2 cai columns theo id
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)


      if (!activeColumn || !overColumn) return false

      // hanh dong keo tha card giua 2 column khac nhau
      if (oldColumnWhenDraggingCard?._id !== overColumn?._id) {
        moveCardBetweenDifferenceColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        // hanh dong keo tha card trong 1 column
        // lấy vị trí cũ từ active
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)

        // lấy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        // console.log('dndOrderedCards = ', dndOrderedCards)

        // se call api update orderCardsIds cho column sau khi drag xong
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          // tim toi column chung ta dang thao tac
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          targetColumn.cards = [...dndOrderedCards]
          targetColumn.cardOrderIds = targetColumn.cards.map(c => c._id)

          return nextColumns
        })
      }

      return false
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // nếu vị trí trước và sau không giống nhau thì mới thực hiện update
      if (active.id !== over.id) {
        // lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)

        // lấy vị trí mới từ over
        const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // se call api update orderColumnsIds cho board sau khi drag xong
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // set các giá trị về null sau khi drag end
    setActiveDragItemType(null)
    setActiveDragItemId(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ style: { active: { opacity: '0.5' } } })
  }

  const collisionDetectionStrategy = useCallback((args) => {
    // console.log('collisionDetectionStrategy')
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }


    // tim cac diem giao nhau voi con tro
    const pointerIntersections = pointerWithin(args)
    // console.log('pointerIntersections = ', pointerIntersections)
    if (!pointerIntersections?.length) return

    // const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      // console.log('checkColumn = ', checkColumn)
      if (checkColumn) {
        // console.log('overId before = ', overId)

        overId = closestCorners({
          ...args, droppableContainers: args.droppableContainers.filter((container) => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id))
        })[0]?.id

        // console.log('overId after = ', overId)
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (<DndContext
	  sensors={sesnors}
	  // collisionDetection={closestCorners}
	  // chỉ dùng closestCorners sẽ bị lỗi khi kéo vào giữa, gây lỗi giật giật
	  // https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx
	  collisionDetection={collisionDetectionStrategy}
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
