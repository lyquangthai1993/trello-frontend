import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="demo-select-dark-light-mode">Mode</InputLabel>
    <Select
      labelId="demo-select-dark-light-mode"
      id="demo-select-dark-light-mode"
      value={mode}
      label="Mode"
      onChange={handleChange}
    >
      <MenuItem value={'light'}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1
        }}>
          <LightModeIcon fontSize="small"/> Light
        </Box>
      </MenuItem>
      <MenuItem value={'dark'}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1
        }}>
          <DarkModeIcon fontSize="small"/> Dark
        </Box>
      </MenuItem>
      <MenuItem value={'system'}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1
        }}>
          <SettingsBrightnessIcon fontSize="small"/> System
        </Box>
      </MenuItem>
    </Select>
  </FormControl>)
}

export default function App() {
  return (<Container
    disableGutters={true}
    maxWidth={false}
    sx={{
      height: '100vh', backgroundColor: 'primary.main'
    }}>

    <Box sx={{
      backgroundColor: 'primary.light',
      with: '100%', height: (theme) => `${theme.trelloCutom.appBarHeight}`,
      display: 'flex', alignItems: 'center'
    }}>
      <ModeSelect/>
    </Box>

    <Box sx={{
      backgroundColor: 'primary.dark',
      with: '100%', height: (theme) => `${theme.trelloCutom.boardBarHeight}`,
      display: 'flex', alignItems: 'center'
    }}>
      Board Bar
    </Box>

    <Box sx={{
      backgroundColor: 'primary.main',
      with: '100%', height: (theme) => `calc(100vh - ${theme.trelloCutom.appBarHeight} - ${theme.trelloCutom.boardBarHeight})`,
      display: 'flex', alignItems: 'center'
    }}>
      Board Content
    </Box>
  </Container>)
}
