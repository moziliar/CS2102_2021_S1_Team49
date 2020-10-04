import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { UserContext } from '../contexts/UserContext';
import '../styles/ProfilePage.css';

class ProfilePage extends Component {
	static contextType = UserContext;
  render() {
		return(
			<div className="profilePage">
				<Container>
					{ console.log(this.context.users[0].email) }
					<Row>
						<Col>{ this.context.users[0].email }</Col>
					</Row>
				</Container>
			</div>
		);
	};
}

export default ProfilePage;