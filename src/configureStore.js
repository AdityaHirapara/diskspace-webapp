import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const configureStore = () => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
      : compose

  const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
  const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducer, enhancer)
  const persistor = persistStore(store)
  // const store = createStore(reducers, applyMiddleware(thunk))

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(reducers)
      })
    }
  }

  return { store, persistor }
}

export default configureStore
