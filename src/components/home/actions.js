import keymirror from 'keymirror'
import axios from 'axios'

export const ActionType = keymirror({
  LOGIN_CHANGES: null,
  LOGIN_STATUS: null,
  LOG_IN: null,
});

export const login = (data, value, callback) => {
  return dispatch => {
    return dispatch({ type: ActionType.LOG_IN, payload: {} })
  }
}