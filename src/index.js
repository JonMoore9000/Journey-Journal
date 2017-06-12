import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
//import Journal from './components/journal';
import App from './components/app';
//import AddForm from './components/add-form';
import AuthExample from './components/app';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <AuthExample />
  </Provider>,
  document.getElementById('root')
);
