import Apps from '@mui/icons-material/Apps'
import { SvgIcon, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { ReactComponent as Logo } from '~/assets/slack.svg'
import WorkSpace from '~/components/AppBar/Menus/WorkSpace'
import ModeSelect from '~/components/ModeSelect'

function AppBar() {
  return (
    <Box sx={{
      with: '100%', height: (theme) => `${theme.trelloCutom.appBarHeight}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Apps sx={{ color: 'primary.main' }}/>
        <Box>
          <SvgIcon component={Logo} inheritViewBox sx={{ color: 'primary.main' }}/>

          <Typography variant="span" sx={{ fontSize:'1.2', color: 'primary.main' }}>
            TL
          </Typography>
        </Box>
        <WorkSpace/>
      </Box>
      <Box>
        <ModeSelect/>
      </Box>
    </Box>
  )
}

export default AppBar
