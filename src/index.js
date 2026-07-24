import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from 'store/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 렌더링 최적화 확인 시, 잠시 주석처리
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
