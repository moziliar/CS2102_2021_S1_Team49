import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../styles/HomePage.scss';

class HomePage extends Component {
	render() {
		return (
			<div className="homepage">
				<div className="center-text">
					<h1>Sed ut perspiciatis unde omnis</h1>
					<p>Duis aute irure dolor in in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
					<Link to="/signup"><Button variant="info" onClick={ this.handleShow }>Register now</Button></Link>
				</div>
			</div>
		);
	}
}

export default HomePage;