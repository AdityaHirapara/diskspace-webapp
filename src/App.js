import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getHomeUrl } from './components/home/urls';
import Home from './components/home';

import { createBrowserHistory } from 'history';
import './App.css';

const queryString = require('query-string');

class App extends Component {
	render() {
		const { history } = this.props;
		const browserHistory = createBrowserHistory({
			basename: process.env.PUBLIC_URL
		});
		let parsed = '';
		if (window.location.search) {
			parsed = queryString.parse(window.location.search);
		}

		return (
			<BrowserRouter history={browserHistory}>
				<Switch>
					<Route
						exact
						path={getHomeUrl()}
						component={Home}
						history={history}
					/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
