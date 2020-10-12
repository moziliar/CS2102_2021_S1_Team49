import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import '../styles/NavigationBar.scss';

const NavigationBar = (props) => {
	const userContext = useContext(UserContext);
	const location = useLocation();

	return (
		<div className="navigation">
			<Navbar>
				<Link to="/" className="brand">CareTaker</Link>
				<Nav className="links">
					{ userContext.isLoggedIn
							? <div>
									<Link to="/profile">My Profile</Link>
									<Link to="/profile">Find Care Takers</Link>
									<Link to="/profile">Become Care Taker</Link>
								</div>
							: <div>
									<Link to="/signin">Sign In</Link>
									<Link to="/signup">Sign Up</Link>
								</div>
					}
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavigationBar;
