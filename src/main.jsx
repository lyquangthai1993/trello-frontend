import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import theme from './theme'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <CssVarsProvider theme={theme}>
	  <ConfirmProvider>
		  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
		  <CssBaseline/>
		  <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
		  />
		  <App/>
	  </ConfirmProvider>
    </CssVarsProvider>

)
