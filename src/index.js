import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStoreWithMiddleware from './redux/create';
import FashionFrau from './components/fashion_frau';

const store = createStoreWithMiddleware();

ReactDOM.render(
  <Provider store={store}>
    <FashionFrau />
  </Provider>
  , document.querySelector('.container'));
