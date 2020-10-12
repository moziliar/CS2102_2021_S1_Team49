import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import ProtectedRoute from './ProtectedRoute';
import EditProfileSection from './subcomponents/EditProfileSection';
import '../styles/ProfilePage.scss';
import MyPetsSection from './subcomponents/MyPetsSection';

// import { LoginReq } from '../../app/protos/user_pb';
// import { UsersClient } from '../../app/protos/user_grpc_web_pb';

// const srv = new UsersClient("http://localhost:9090") // This one

const USER_TYPE = {
	PET_OWNER: 0,
	CARE_TAKER: 1,
  BOTH: 2,
  PCS_ADMIN: 3,
}

class ProfilePage extends Component {
	static contextType = UserContext;

  render() {
		const { currentUser } = this.context;
		return(
			<div className="profile-page">
				{ console.log(currentUser) }
				<Container>
					<Row>
						<Col xs={ 3 }>
							<div className="profile-section">
								<img src="https://i0.wp.com/www.oakridge.in/wp-content/uploads/2020/02/Sample-jpg-image-500kb.jpg"/>
								<h5>{ currentUser.profile.name }</h5>
								<small style={{ 'color': '#06748A' }}>{ currentUser.email }</small>
							</div>
							{ this._renderLinks() }
						</Col>
						<Col xs={{ span: 8, offset:1 }	}>
							<ProtectedRoute path="/profile" component={ EditProfileSection }/>
							<ProtectedRoute path="/past-transactions" component={ EditProfileSection }/>
							<ProtectedRoute path="/my-pets" component={ MyPetsSection }/>
							<ProtectedRoute path="/ongoing-transactions" component={ EditProfileSection }/>
							<ProtectedRoute path="/pending-bids" component={ EditProfileSection }/>
							<ProtectedRoute path="/paycheck" component={ EditProfileSection }/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	_renderLinks = () => {
		const { status } = this.context.currentUser;

		const links = []
		links.push(
			<NavLink activeClassName="is-active" to="/profile" key="profile">My Profile</NavLink>,
			<NavLink activeClassName="is-active" to="/past-transactions" key="past-transactions">Past Transactions</NavLink>
		);

		if (status === USER_TYPE.PET_OWNER || status === USER_TYPE.BOTH) {
			links.push(
				<NavLink activeClassName="is-active" to="/my-pets" key="pets">My Pets</NavLink>,
			);
		}
		if (status === USER_TYPE.CARE_TAKER || status === USER_TYPE.BOTH) {
			links.push(
				<NavLink activeClassName="is-active" to="/ongoing-transactions" key="ongoing-transactions">Ongoing Transactions</NavLink>,
				<NavLink activeClassName="is-active" to="/pending-bids" key="pending-bids">Pending Bids</NavLink>,
				<NavLink activeClassName="is-active" to="/paycheck" key="paycheck">Paycheck</NavLink>
			);
		}

		return (
			<div style={{ 'marginTop': '20px', padding: '20px'}}>
				{ links }
			</div>
		);
	};
}

export default ProfilePage;
