import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { Status } from '../../app/models/users';
import { UserContext } from '../contexts/UserContext';
import EditProfileSection from './subcomponents/EditProfileSection';
import MyPetsSection from './subcomponents/MyPetsSection';
import PastTransactionsSection from './subcomponents/PastTransactionsSection';
import OngoingTransactionsSection from './subcomponents/OngoingTransactionsSection';
import OngoingBidsSection from './subcomponents/OngoingBidsSection';
import ProtectedRoute from './subcomponents/ProtectedRoute';

import '../styles/ProfilePage.scss';

class ProfilePage extends Component {
	static contextType = UserContext;

  render() {
		const { currentUser, signOutFunc } = this.context;
		return(
			<div className="profile-page">
				<Container>
					<Row>
						<Col xs={ 3 }>
							<div className="profile-section">
								<img src="https://i0.wp.com/www.oakridge.in/wp-content/uploads/2020/02/Sample-jpg-image-500kb.jpg"/>
								<h5>{ currentUser.name }</h5>
								<small style={{ 'color': '#06748A', 'marginBottom': '20px' }}>{ currentUser.email }</small>
								<Button 
									style={{ 'marginTop': '20px' }} 
									variant="danger"
									onClick={ signOutFunc }>Sign out</Button>
							</div>
							{ this._renderLinks() }
						</Col>
						<Col xs={{ span: 8, offset:1 }	}>
							<ProtectedRoute path="/profile" component={ EditProfileSection } exact/>
							<ProtectedRoute path="/profile/past-transactions" component={ PastTransactionsSection }/>
							<ProtectedRoute path="/profile/my-pets" component={ MyPetsSection }/>
							<ProtectedRoute path="/profile/ongoing-transactions" component={ OngoingTransactionsSection }/>
							<ProtectedRoute path="/profile/pending-bids" component={ OngoingBidsSection }/>
							<ProtectedRoute path="/profile/paycheck" component={ EditProfileSection }/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	_renderLinks = () => {
		const { status } = this.context.currentUser;

		const links: any[] = [];
		links.push(
			<NavLink activeClassName="is-active" to="/profile" key="profile" exact>My Profile</NavLink>,
			<NavLink activeClassName="is-active" to="/profile/past-transactions" key="past-transactions">Past Transactions</NavLink>
		);
		if (status === Status.PET_OWNER || status === Status.BOTH) {
			links.push(
				<NavLink activeClassName="is-active" to="/profile/my-pets" key="pets">My Pets</NavLink>,
			);
		}
		if (status === Status.CARE_TAKER || status === Status.BOTH) {
			links.push(
				<NavLink activeClassName="is-active" to="/profile/ongoing-transactions" key="ongoing-transactions">Ongoing Transactions</NavLink>,
				<NavLink activeClassName="is-active" to="/profile/pending-bids" key="pending-bids">Pending Bids</NavLink>,
				<NavLink activeClassName="is-active" to="/profile/paycheck" key="paycheck">Paycheck</NavLink>
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