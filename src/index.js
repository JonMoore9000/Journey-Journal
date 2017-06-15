import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import App from './components/app';
import AuthExample from './components/app';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <AuthExample />
  </Provider>,
  document.getElementById('root')
);
