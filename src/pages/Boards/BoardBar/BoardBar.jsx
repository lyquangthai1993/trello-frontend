import { Dashboard, VpnLock } from '@mui/icons-material'
import { Chip } from '@mui/material'
import Box from '@mui/material/Box'
import { uppercaseFirstLetter } from '~/utils/fommater'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar(props) {
  const { board } = props
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      with: '100%', height: (theme) => `${theme.trelloCutom.boardBarHeight}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto'

    }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <Chip
          sx={MENU_STYLES}
          icon={<Dashboard/>}
          label={board?.title}
          clickable
        />

        {board?.type &&
          <Chip
            sx={MENU_STYLES}
            icon={<VpnLock/>}
            label={uppercaseFirstLetter(board?.type)}
            clickable
          />
        }
      </Box>
    </Box>
  )
}

export default BoardBar
