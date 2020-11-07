import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import DatePicker from 'react-date-picker';

import { UserContext } from '../../contexts/UserContext';
import { CreditCard, User } from '../../../app/models/users';

const EMAIL = 'email';
const NAME = 'name';
const PHONE = 'phone';
const PIC_URL = 'pic_url';
const CREDIT_CARD = 'credit_card';
const HOLDER_NAME = "holder_name";
const CARD_NUMBER = 'cc_number';
const EXPIRY_DATE = 'expiry_date';

export type UpdateForm = {
	[EMAIL]: string,
	[NAME]: string,
	[PHONE]: number,
	[PIC_URL]: string,
	[CREDIT_CARD]: Array<CreditCard | object>,
}

type IState = {
	formData: UpdateForm
}

class EditProfileSection extends Component<{}, IState> {
	static contextType = UserContext;
	currentUser: User = this.context.currentUser;

	state = {
		formData: {
			[EMAIL]: this.currentUser.email,
			[NAME]: this.currentUser.name,
			[PHONE]: this.currentUser.phone,
			[PIC_URL]: this.currentUser.pic_url || '',
			[CREDIT_CARD]: this.currentUser.credit_card,
		}
	};

	_onHandleInputChange = (field: string, value: any) => {
		const newForm: UpdateForm = _.cloneDeep(this.state.formData);
		_.set(newForm, field, value);
		this.setState({ formData: newForm });
	}

	_onUpdateUser = () => {
		this.context.updateUserFunc(this.state.formData);
	}

	_addCreditCard = (index: number) => {
		const { formData } = this.state;
		this.context.addCreditCard(formData[EMAIL], formData[CREDIT_CARD][index]);
	}

	_deleteCreditCard = (cc_number: number) => {
		const { formData } = this.state;
		this.context.deleteCreditCard(formData[EMAIL], cc_number);
	}

	componentDidUpdate = () => {
		if (this.context.currentUser.credit_card.length !== this.state.formData[CREDIT_CARD].length) {
			const newForm: UpdateForm = _.cloneDeep(this.state.formData);
			_.set(newForm, CREDIT_CARD, this.context.currentUser.credit_card);
			this.setState({ formData: newForm });
		}
	}

	render() {
		const { formData } = this.state;

		const creditCards = formData[CREDIT_CARD];
		const _renderCardList: Array<any> = [];
		const totalCards: number = creditCards.length;

		for (let i = 0; i < totalCards; i++) {
			_renderCardList.push(this._renderCreditCard(i, creditCards[i], totalCards));
		}
		
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
								onChange={ (e) => this._onHandleInputChange(NAME, e.target.value) }/>
						</Col>
						<Col>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control 
								type="number" 
								value={ formData[PHONE] } 
								onChange={ (e) => this._onHandleInputChange(PHONE, e.target.value) }/>
						</Col>
					</Row>
					<Form.Group>
						<Form.Label>Picture Url</Form.Label>
						<Form.Control 
								type="text" 
								value={ formData[PIC_URL] } 
								onChange={ (e) => this._onHandleInputChange(PIC_URL, e.target.value) }/>
					</Form.Group>
					{ this.context.succMessage 
						? <p style={{ 'color': '#38a832' }}>{ this.context.succMessage }</p>
						: null
					}
					<Button variant="primary" onClick={ this._onUpdateUser } className="update-btn">
						Update Basic Information
					</Button>
					<hr />
					<h3 style={{ 'margin': '20px 0' }}>Manage your cards</h3>
					{ _renderCardList }
				</Form>
			</div>
		);
	} 

	_renderCreditCard(index: number, card: CreditCard | object, totalCards: number) {
		const isNewCard = index === totalCards - 1;

		return (
			<div key ={ index }>
				<Row>
					<Col>
						<Form.Label>Holder Name</Form.Label>
						<Form.Control 
							type="text" 
							value={ "holder_name" in card ? card[HOLDER_NAME] : '' } 
							disabled={ !isNewCard }
							onChange={ (e) => this._onHandleInputChange(`credit_card[${index}].holder_name`, e.target.value) }/>
					</Col>
					<Col>
						<Form.Label>Credit Card Number</Form.Label>
						<Form.Control 
							type="number" 
							value={ "cc_number" in card ? card[CARD_NUMBER] : '' } 
							disabled={ !isNewCard }
							onChange={ (e) => this._onHandleInputChange(`credit_card[${index}].cc_number`, e.target.value) }/>
					</Col>
					<Col>
						<Form.Label>Expiry Date</Form.Label>
						<br />
						<DatePicker 
							value={ "expiry_date" in card ? new Date(card[EXPIRY_DATE]) : new Date(Date.now()) }
							format="y-MM-dd"
							disabled={ !isNewCard }
							onChange={ date => this._onHandleInputChange(`credit_card[${index}].expiry_date`, date) }/>
					</Col>
					<br />
				</Row>
				{ index !== totalCards - 1 
					? <Button variant="danger" onClick={ () => this._deleteCreditCard(card[CARD_NUMBER]) }>Delete Card</Button>
					: <Button variant="success" onClick={ () => this._addCreditCard(index) }>Add New Card</Button>
				}
			</div>
		);
	}
}

export default EditProfileSection;
