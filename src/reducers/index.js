import { combineReducers } from 'redux'
import { HomeReducer } from 'src/components/home/reducer'

export default combineReducers({
  home: HomeReducer,
})
