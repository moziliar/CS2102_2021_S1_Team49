import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import NavigationBar from './NavigationBar';
import SignInPage from './SignInPage';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
	return (
		<>
			<NavigationBar />
			<Switch>
				<Route path="/" component= { HomePage } exact />
				<Route path="/signin" component={ SignInPage } exact />
				<Route path="/signup" component={ SignInPage } exact />
				<ProtectedRoute path="/profile" component={ ProfilePage } exact/>
				<Redirect from="*" to="/" />
			</Switch>
		</>
	);
}

export default App;
