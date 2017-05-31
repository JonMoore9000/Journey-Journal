import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
//import Journal from './components/journal';
import App from './components/app';
//import AddForm from './components/add-form';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
