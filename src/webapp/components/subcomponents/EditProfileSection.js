import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import { UserContext } from '../../contexts/UserContext';

const NAME = 'name';
const PHONE = 'phone';
const PIC_URL = 'picture_url';
const CREDIT_CARD_NUMBER = 'card_number';
const CREDIT_CARD_EXPIRY = 'expiry_date';

class EditProfileSection extends Component {
	static contextType = UserContext;

	state = {
		formData: {
			[NAME]: this.context.currentUser.profile.name,
			[PHONE]: this.context.currentUser.profile.phone,
			[PIC_URL]: this.context.currentUser.profile.picture_url,
			[CREDIT_CARD_NUMBER]: this.context.currentUser.credit_card.card_number,
			[CREDIT_CARD_EXPIRY]: this.context.currentUser.credit_card.expiry_date
		}
	};

	onHandleInputChange = (field, value) => {
		this.setState({
			formData: {
				...this.state.formData,
				[field]: value
			}
		});
	};

	// Send api request to update user
	onUpdateUser = () => {

	}

	render() {
		const { formData } = this.state;
		
		return (
			<div className="edit-information">
				<h2>Edit Your Profile</h2>
				<Form>
					<Row>
						<Col>
							<Form.Label>Your name</Form.Label>
							<Form.Control 
								type="text" 
								value={ formData[NAME] } 
								onChange={ (e) => this.onHandleInputChange(NAME, e.target.value) }/>
						</Col>
						<Col>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control 
								type="text" 
								value={ formData[PHONE] } 
								onChange={ (e) => this.onHandleInputChange(PHONE, e.target.value) }/>
						</Col>
					</Row>
					<Form.Group>
						<Form.Label>Bio</Form.Label>
						<Form.Control as="textarea" rows="5" />
					</Form.Group>
					<Form.Group>
						<Form.Label>Picture Url</Form.Label>
						<Form.Control 
								type="text" 
								value={ formData[PIC_URL] } 
								onChange={ (e) => this.onHandleInputChange(PIC_URL, e.target.value) }/>
					</Form.Group>
					<Row>
						<Col>
							<Form.Label>Credit Card Number</Form.Label>
							<Form.Control 
								type="text" 
								value={ formData[CREDIT_CARD_NUMBER] } 
								onChange={ (e) => this.onHandleInputChange(CREDIT_CARD_NUMBER, e.target.value) }/>
						</Col>
						<Col>
							<Form.Label>Expiry Date</Form.Label>
							<Form.Control 
								type="text" 
								value={ formData[CREDIT_CARD_EXPIRY] } 
								onChange={ (e) => this.onHandleInputChange(CREDIT_CARD_EXPIRY, e.target.value) }/>
						</Col>
					</Row>
					<Button variant="primary" onClick={ this.onUpdateUser } className="update-btn">
						Update Basic Information
					</Button>
				</Form>
			</div>
		);
	} 
}

export default EditProfileSection;