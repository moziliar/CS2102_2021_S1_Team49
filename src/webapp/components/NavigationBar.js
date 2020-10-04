import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../styles/NavigationBar.css';

const NavigationBar = () => {
	return (
		<div className="navigation">
			<Navbar>
				<Link to="/" className="brand">CareTaker</Link>
				<Nav className="links">
					<Link to="/profile">My Profile</Link>
					<Link to="/profile">Find Care Takers</Link>
					<Link to="/profile">Become Care Taker</Link>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavigationBar;
