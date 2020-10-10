import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const userContext = useContext(UserContext);

	return (
		<Route {...rest} render={(props) => (
			userContext.isLoggedIn
				? <Component {...props} />
				: <Redirect to='/signin' />
		)} />
	);
};

export default ProtectedRoute;