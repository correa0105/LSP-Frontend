export function loginRequest(payload) {
  return {
    type: 'LOGIN_REQUEST',
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: 'LOGIN_SUCCESS',
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: 'LOGIN_FAILURE',
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: 'REGISTER_REQUEST',
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: 'REGISTER_UPDATED_SUCCESS',
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: 'REGISTER_CREATED_SUCCESS',
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: 'REGISTER_FAILURE',
    payload,
  };
}
