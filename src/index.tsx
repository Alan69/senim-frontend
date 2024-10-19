import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './page-layout.scss'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import 'swiper/css';
import 'swiper/css/navigation';
import './styles/vendors/menu.css';
import './styles/style.css';
import store from './redux/store.ts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)