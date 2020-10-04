import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import NavigationBar from './NavigationBar';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavigationBar />
				<Switch>
					<Route path="/profile" component={ ProfilePage } exact/>
				</Switch>
			</React.Fragment>
		);
	};
}

export default App;
