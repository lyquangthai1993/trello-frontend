import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import theme from './theme'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline/>
      <App/>
    </CssVarsProvider>
  </React.StrictMode>
)
