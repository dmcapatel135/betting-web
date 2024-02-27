import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';
import App from './app';

const sagaMiddleware = createSagaMiddleware();
const reducer = createReducer();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

sagaMiddleware.run(rootSaga);

const MOUNT_NODE = document.getElementById('app');

const root = ReactDOM.createRoot(MOUNT_NODE);

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.bet);
    const serializedJackpotState = JSON.stringify(state.jackpot);
    localStorage.setItem('reduxState', serializedState);
    localStorage.setItem('jackpotState', serializedJackpotState);
  } catch (error) {
    // Handle any errors
  }
};

// Call this function whenever the Redux state changes
store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Return undefined to use the initial state defined in your reducers
    }
    return JSON.parse(serializedState === {} ? [] : serializedState);
  } catch (error) {
    return undefined; // Return undefined to use the initial state defined in your reducers
  }
};
export const loadStateFromJackpotLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('jackpotState');
    if (serializedState === null) {
      return undefined; // Return undefined to use the initial state defined in your reducers
    }
    return JSON.parse(serializedState === {} ? [] : serializedState);
  } catch (error) {
    return undefined; // Return undefined to use the initial state defined in your reducers
  }
};

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
);
