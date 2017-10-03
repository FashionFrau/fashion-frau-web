import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOOKS_FETCH_REQUESTED, LOOKS_FETCH_SUCCEEDED } from '../../actions';
import { api } from '../../api/api';


// // worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchLooks(action) {
   try {
      const response = yield call(api.fetchLooks);
      yield put({type: LOOKS_FETCH_SUCCEEDED, payload: response});
   } catch (e) {
      yield put({type: "LOOKS_FETCH_FAILED", message: e.message});
   }
}
//
// /*
//   Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
//   Allows concurrent fetches of user.
// */
// function* mySaga() {
//   yield takeEvery("LOOKS_FETCH_REQUESTED", fetchUser);
// }
//
// /*
//   Alternatively you may use takeLatest.
//
//   Does not allow concurrent fetches of user. If "LOOKS_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */
// function* mySaga() {
//   yield takeLatest("LOOKS_FETCH_REQUESTED", fetchUser);
// }


function* watchFetchLooks() {
  yield takeEvery(LOOKS_FETCH_REQUESTED, fetchLooks);
}

export default function* rootSaga() {
  yield[
    watchFetchLooks()
  ]
};
