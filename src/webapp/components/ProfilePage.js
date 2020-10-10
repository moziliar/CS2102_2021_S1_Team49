import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { UserContext } from '../contexts/UserContext';
import '../styles/ProfilePage.css';
// import { LoginReq } from '../../app/protos/user_pb';
// import { UsersClient } from '../../app/protos/user_grpc_web_pb';

// const srv = new UsersClient("http://localhost:9090") // This one

class ProfilePage extends Component {
	static contextType = UserContext;

	// componentDidMount = () => {
	// 	const req = new LoginReq();
	// 	req.setEmail(10);
	// 	req.setPassword(10);

	// 	srv.login(req, {}, (err, response) => {
	// 		if (err) {
	// 				console.log("Error: ", err)
	// 			}
	// 		console.log(response)
	// 	})
	// }

  render() {
		return(
			<div className="profilePage">
				<Container>
					<Row>
						<Col>{console.log(this.context)}</Col>
					</Row>
				</Container>
			</div>
		);
	};
}

export default ProfilePage;
