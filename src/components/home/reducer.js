import { ActionType } from './actions'

const initialState = {
  isAuthenticated: 'checking',
  details: {
    loaded: true,
    profile: {
      loggedIn: false,
      user: {}
    }
  }
}

export function HomeReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOG_IN: {
      return {
        ...state,
        isAuthenticated: true,
        details: {
          loaded: true,
          profile: action.payload
        }
      }
    }

    default: {
      return state
    }
  }
}