import { ActionType } from './actions'

const initialState = {
  isAuthenticated: false,
  details: {
    loaded: true,
    profile: {}
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

    case ActionType.LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        details: {
          loaded: true,
          profile: {}
        }
      }
    }

    default: {
      return state
    }
  }
}