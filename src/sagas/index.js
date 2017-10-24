import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from '../actions'
import { api } from '../services';



function* authenticate(action) {
  try {
    const response = yield call(api.authenticate, action.params);
    if (response.status === 200) {
      yield put({type: ActionTypes.LOGIN.SUCCESS, payload: response});
    } else {
      yield put({type: ActionTypes.LOGIN.FAILURE, message: 'Something went wrong'});
    }
  } catch (e) {
    yield put({type: ActionTypes.LOGIN.FAILURE, message: e.message});
  }
}

function* logout(action) {
  try {
    const response = yield call(api.logout);
    yield put({type: ActionTypes.LOGOUT.SUCCESS});
  } catch (e) {
    yield put({type: ActionTypes.LOGOUT.FAILURE});
  }
}


/******************************************************************************/

function* fetchLooks(action) {
   try {
      const response = yield call(api.fetchLooks, action.params);
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

function* watchAuthenticate() {
  yield takeLatest(ActionTypes.LOGIN.REQUEST, authenticate);
}

function* watchLogout() {
  yield takeEvery(ActionTypes.LOGOUT.REQUEST, logout);
}

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
    watchAuthenticate(),
    watchLogout(),

    watchFetchLooks(),
    watchFetchLook(),
    watchDeleteLook()
  ]
};
