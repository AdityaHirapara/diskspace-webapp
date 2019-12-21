import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();
window.store = store;
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./App', () => {
		ReactDOM.render(
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>,
			document.getElementById('root')
		);
	});
}