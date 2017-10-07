import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './components';
import LookList from './container/look_list';
import createStoreWithMiddleware from './store/configureStore';

const store = createStoreWithMiddleware();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={ App } />
          <Route path="/looks" component={ App } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.main'));
