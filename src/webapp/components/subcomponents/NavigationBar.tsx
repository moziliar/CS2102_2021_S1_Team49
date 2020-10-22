import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../styles/NavigationBar.scss';

const NavigationBar = () => {
	return (
		<div className="navigation">
			<Navbar>
				<Link to="/" className="brand">CareTaker</Link>
				<Nav className="links">
					{/* { userContext.isLoggedIn */}
							{/* ? <div> */}
									<Link to="/profile">My Profile</Link>
									<Link to="/profile">Find Care Takers</Link>
									<Link to="/profile">Become Care Taker</Link>
								{/* </div> */}
							{/* : <div> */}
									<Link to="/signin">Sign In</Link>
									<Link to="/signup">Sign Up</Link>
								{/* </div> */}
					{/* } */}
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavigationBar;