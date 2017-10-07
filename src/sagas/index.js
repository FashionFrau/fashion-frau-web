import { call, put, takeLatest } from 'redux-saga/effects';
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

function* fetchLook(action) {
   try {
      const response = yield call(api.fetchLook, action.id);
      yield put({type: ActionTypes.LOOK.SUCCESS, payload: response});
   } catch (e) {
      yield put({type: ActionTypes.LOOK.FAILURE, message: e.message});
   }
}

function* deleteLook(action) {
   try {
      const response = yield call(api.deleteLook, action.id);
      yield put({type: ActionTypes.LOOK.SUCCESS, payload: response});
   } catch (e) {
      yield put({type: ActionTypes.LOOK.FAILURE, message: e.message});
   }
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchLooks() {
  yield takeLatest(ActionTypes.LOOKS.REQUEST, fetchLooks);
}

function* watchFetchLook() {
  yield takeLatest(ActionTypes.LOOK.REQUEST, fetchLook);
}

function* watchDeleteLook() {
  yield takeLatest(ActionTypes.LOOK.DELETE, deleteLook);
}

export default function* rootSaga() {
  yield[
    watchFetchLooks(),
    watchFetchLook(),
    watchDeleteLook()
  ]
};
