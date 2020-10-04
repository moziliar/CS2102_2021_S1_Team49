import React, { createContext, Component } from 'react';
import { mockUsers } from '../../app/models/mockUsers.ts';

export const UserContext = createContext();

class UserContextProvider extends Component {
	state = {
		users: mockUsers
	};

	render() {
		return (
			<UserContext.Provider value={ { ...this.state } }>
				{ this.props.children }
			</UserContext.Provider>
		);
	};
}

export default UserContextProvider;
