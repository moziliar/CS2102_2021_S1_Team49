import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import '../../styles/NavigationBar.scss';

const NavigationBar = () => {
	const userContext = useContext(UserContext);

	return (
		<div className="navigation">
			<Navbar>
				<Link to="/" className="brand">CareTaker</Link>
				<Nav className="links">
					{ userContext.isLoggedIn
						? !userContext.currentUser?.is_admin 
							? <div>
								<NavLink activeClassName="is-active" to="/profile">My Profile</NavLink>
								<NavLink activeClassName="is-active" to="/search">Find Care Taker</NavLink>
							  </div>
							: <div>
								<NavLink activeClassName="is-active" to="/pcs-dashboard">DashBoard</NavLink>
								<Link to="/signin" onClick={ userContext.signOutFunc }>Sign Out</Link>
							  </div>
						: <div>
								<NavLink activeClassName="is-active" to="/signin">Sign In</NavLink>
								<NavLink activeClassName="is-active" to="/signup">Sign Up</NavLink>
							</div>
					}
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavigationBar;