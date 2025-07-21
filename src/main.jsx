import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { dbApp } from '../configuration/FirebaseConfig.js'
import './index.css'
import Modal from 'react-modal';
Modal.setAppElement('#root');
import store from '../src/Redux/Store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
