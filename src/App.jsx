import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { useColorScheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
	    {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

export default function App() {
  return (<Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <ModeToggle></ModeToggle>
      <Typography variant="body2" component="h1" color="text.secondary" sx={{ mb: 2 }}>
				Material UI Vite.js example
      </Typography>
    </Box>
  </Container>)
}
