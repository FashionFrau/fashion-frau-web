import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components'
import LookList from './container/look_list'
import createStoreWithMiddleware from './store/configureStore'

const store = createStoreWithMiddleware();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
          {/* <Route path="/looks" component={ App } /> */}
          <Route path="/" component={ App } />
      </div>
    </Router>
  </Provider>
  , document.querySelector('.main'));
