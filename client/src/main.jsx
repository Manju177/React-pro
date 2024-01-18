import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from  './redux/store.js'
import { Provider } from 'react-redux'
import { persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { toast, ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer/>
    <App />
    </PersistGate>
  </Provider >,
)
