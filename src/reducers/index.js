import { combineReducers } from 'redux'
import { HomeReducer } from 'src/components/home/reducer'
import { DashboardReducer } from 'src/components/dashboard/reducer'

export default combineReducers({
  home: HomeReducer,
  dashboard: DashboardReducer
})
