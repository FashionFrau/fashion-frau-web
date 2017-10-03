import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions'
import { api } from '../services';

function* fetchLooks(action) {
   try {
      const response = yield call(api.fetchLooks);
      yield put({type: ActionTypes.LOOKS.SUCCESS, payload: response});
   } catch (e) {
      yield put({type: ActionTypes.LOOKS.FAILURE, message: e.message});
   }
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchLooks() {
  yield takeLatest(ActionTypes.LOOKS.REQUEST, fetchLooks);
}

export default function* rootSaga() {
  yield[
    watchFetchLooks()
  ]
};
