import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: false,
  lawyer: {},
};

export default function reducer(state = initialState, action = null) {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      const newState = { ...state };
      return newState;
    }

    case 'LOGIN_SUCCESS': {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.lawyer = action.payload.lawyer;
      return newState;
    }

    case 'LOGIN_FAILURE': {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }

    case 'REGISTER_REQUEST': {
      const newState = { ...state };
      return newState;
    }

    case 'REGISTER_CREATED_SUCCESS': {
      const newState = { ...state };
      return newState;
    }

    case 'REGISTER_FAILURE': {
      const newState = { ...state };
      return newState;
    }

    default: {
      return state;
    }
  }
}
