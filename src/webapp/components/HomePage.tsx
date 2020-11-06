import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../styles/HomePage.scss';

class HomePage extends Component {
	render() {
		return (
			<div className="homepage">
				<div className="center-text">
					<h1>Join Us Now</h1>
					<p>The best matching website for your pet and care taker</p>
					<Link to="/signup"><Button variant="info">Register now</Button></Link>
				</div>
			</div>
		);
	}
}

export default HomePage;