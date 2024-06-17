import { call, all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/login', payload.lawyer);

    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    payload.loginPage();
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    console.log(errors);

    yield put(actions.loginFailure());
  }
}

function* registerRequest({ payload }) {
  const { name, cpf, oab, email, password, confirmpassword } = payload.lawyer;
  try {
    yield call(axios.post, '/lawyers', {
      name,
      cpf,
      oab,
      email,
      password,
      confirmpassword,
    });

    yield put(actions.registerCreatedSuccess(), payload.loginPage());
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      payload.loginPage();
      return yield put(actions.loginFailure());
    }

    console.log(errors);
    yield put(actions.registerFailure());
  }

  return null;
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('LOGIN_REQUEST', loginRequest),
  takeLatest('persist/REHYDRATE', persistRehydrate),
  takeLatest('REGISTER_REQUEST', registerRequest),
]);
