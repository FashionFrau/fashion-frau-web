import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, browserHistory } from 'react-router-dom'

import createStoreWithMiddleware from './store/configureStore'

import routes from './routes';

const store = createStoreWithMiddleware();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{ routes }</Router>
  </Provider>, document.querySelector('.main')
);
