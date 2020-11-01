import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
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
						? <div>
								<NavLink activeClassName="is-active" to="/profile">My Profile</NavLink>
								<NavLink activeClassName="is-active" to="/search">Find Care Taker</NavLink>
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