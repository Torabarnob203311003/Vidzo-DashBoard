import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="bottom-right" />
        <App />
      </PersistGate>
    </Provider>
)
