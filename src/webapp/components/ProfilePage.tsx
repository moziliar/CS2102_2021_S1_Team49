import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import EditProfileSection from './subcomponents/EditProfileSection';
import MyPetsSection from './subcomponents/MyPetsSection';
import PastTransactionsSection from './subcomponents/PastTransactionsSection';
import OngoingTransactionsSection from './subcomponents/OngoingTransactionsSection';
import OngoingBidsSection from './subcomponents/OngoingBidsSection';
import MyAvailabilitySection from './subcomponents/MyAvailabilitySection';
import ProtectedRoute from './subcomponents/ProtectedRoute';

import '../styles/ProfilePage.scss';

class ProfilePage extends Component {
	static contextType = UserContext;

  	render() {
		const { currentUser, signOutFunc, applyCareTaker } = this.context;
		const isCareTaker: boolean = "is_part_time" in currentUser;

		return(
			<div className="profile-page">
				<Container>
					<Row>
						<Col xs={ 3 }>
							<div className="profile-section">
								<img src={ currentUser.pic_url }/>
								<h5>{ currentUser.name }</h5>
								<small style={{ 'color': '#06748A', 'marginBottom': '20px' }}>{ currentUser.email }</small><br />
								<Button 
									style={{ 'marginTop': '20px' }} 
									variant="danger"
									onClick={ signOutFunc }>Sign out</Button>
							</div>
							{ this._renderLinks() }
							{ !isCareTaker
								? <div style={{ 'margin': '0 20px', 'textAlign': 'center' }}>
									<Button variant="success" onClick={ () => applyCareTaker(currentUser.email, false) }><small>Apply Fulltime Taker</small></Button>
									<Button variant="success" onClick={ () => applyCareTaker(currentUser.email, true) } style={{ 'marginTop': '20px' }}><small>Apply Parttime Taker</small></Button>
								  </div> 
								: null
							}
						</Col>
						<Col xs={{ span: 8, offset: 1 }}>
							<ProtectedRoute path="/profile" component={ EditProfileSection } exact/>
							<ProtectedRoute path="/profile/past-transactions" component={ PastTransactionsSection }/>
							<ProtectedRoute path="/profile/my-pets" component={ MyPetsSection }/>
							<ProtectedRoute path="/profile/ongoing-transactions" component={ OngoingTransactionsSection }/>
							<ProtectedRoute path="/profile/pending-bids" component={ OngoingBidsSection }/>
							<ProtectedRoute path="/profile/my-availability" component={ MyAvailabilitySection }/>
							<ProtectedRoute path="/profile/paycheck" component={ EditProfileSection }/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	_renderLinks = () => {
		const isCareTaker: boolean = "is_part_time" in this.context.currentUser;

		const links: any[] = [];
		links.push(
			<NavLink activeClassName="is-active" to="/profile" key="profile" exact>My Profile</NavLink>,
			<NavLink activeClassName="is-active" to="/profile/ongoing-transactions" key="ongoing-transactions">Ongoing Transactions</NavLink>,
			<NavLink activeClassName="is-active" to="/profile/past-transactions" key="past-transactions">Past Transactions</NavLink>,
			<NavLink activeClassName="is-active" to="/profile/my-pets" key="pets">My Pets</NavLink>,
		);

		if (isCareTaker) {
			links.push(
				<NavLink activeClassName="is-active" to="/profile/pending-bids" key="pending-bids">Pending Bids</NavLink>,
				<NavLink activeClassName="is-active" to="/profile/my-availability" key="my-availability">My Availability</NavLink>,
				// <NavLink activeClassName="is-active" to="/profile/paycheck" key="paycheck">Paycheck</NavLink>
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