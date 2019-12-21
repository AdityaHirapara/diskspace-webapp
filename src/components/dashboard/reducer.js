import { ActionType } from './actions'

const initialState = {
  images: [],
}

export function DashboardReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOAD_IMAGES: {
      return {
        ...state,
        images: action.payload
      }
    }

    default: {
      return state
    }
  }
}