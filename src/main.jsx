import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '~/auth/AuthProvider'
import App from './App'
import store from './redux/store'
import theme from './theme'
import 'react-toastify/dist/ReactToastify.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
	<Provider store={store}>
		<AuthProvider>
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
		</AuthProvider>
	</Provider>
)
// build test
