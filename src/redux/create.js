import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/sagas';
import reducers from '../reducers';

export default function() {

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [ sagaMiddleware ];

  const store = createStore(reducers, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
}
