import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </Provider>
  </BrowserRouter>
)
