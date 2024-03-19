import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AddCard, Cloud, DeleteForever, DragHandle, ExpandMore } from '@mui/icons-material'
import { Divider, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import ListCards from '~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'

function Column({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndKitColumnStyles = {
    // touchAction: 'none',
    // nếu sử dụng transform: CSS.Transform sẽ lỗi dạng stretch column
    // github issue: https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.trelloCutom.boardContentHeight} - ${theme.spacing(5)})`
      }}
      style={dndKitColumnStyles}
      {...attributes}
      {...listeners}
    >
      <Box sx={{
        height: (theme) => theme.trelloCutom.columnHeaderHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography
          variant={'h6'}
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >{column.title}
        </Typography>
        <Box>
          <Tooltip title={'More option'}>
            <ExpandMore
              sx={{ color: 'text.primary', cursor: 'pointer' }}
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          </Tooltip>

          <Menu
            id="basic-menu-column-dropdown"
            aria-labelledby="basic-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon><AddCard fontSize={'small'}/></ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><DeleteForever fontSize={'small'}/></ListItemIcon>
              <ListItemText>Remove</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Cloud fontSize={'small'}/></ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>


      <ListCards cards={orderedCards}/>

      <Box sx={{
        height: (theme) => theme.trelloCutom.columnFooterHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button startIcon={<AddCard/>}>Add new card</Button>
        <Tooltip title={'Drag to move'}>
          <DragHandle sx={{ cursor: 'pointer' }}/>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column
