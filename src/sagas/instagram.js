import { call, put, takeLatest } from 'redux-saga/effects';
import * as InstagramActionTypes from '../actions/instagram'
import { instagram_api } from '../services';


export function* getRecentMedia(action) {
   try {
      const response = yield call(instagram_api.getRecentMedia, action.params);
      yield put({type: InstagramActionTypes.USER_RECENT_MEDIA.SUCCESS, payload: response});
   } catch (e) {
      yield put({type: InstagramActionTypes.USER_RECENT_MEDIA.FAILURE, message: e.message});
   }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchGetRecentMedia() {
  yield takeLatest(InstagramActionTypes.USER_RECENT_MEDIA.REQUEST, getRecentMedia);
}
