import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore,applyMiddleware} from  'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
//global store for my application and using reduxdevtool and thunk middleware.
ReactDOM.render(
    <Provider store={store}>                  
    <App />                               
    </Provider>,
  document.getElementById('root')
);

// wapping by application inside the Provider 
// using thunk it helps me to send function as a response than action object. 