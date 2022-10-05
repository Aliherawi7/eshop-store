import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/css/style.css';
import './assets/css/bootstrap-icons.css'
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer'
import "react-toastify/dist/ReactToastify.css"

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

