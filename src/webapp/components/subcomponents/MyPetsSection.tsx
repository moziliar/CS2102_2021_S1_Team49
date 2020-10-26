import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-date-picker";
import _ from 'lodash';

import { User } from '../../../app/models/users';
import { Pet, Gender } from '../../../app/models/pets';
import { UserContext } from '../../contexts/UserContext';

type IState = {
	pets_owned: Array<Pet | object>
}

class MyPetsSection extends Component<{}, IState> {
	static contextType = UserContext;
	currentUser: User = this.context.currentUser;

	state: IState = {
		pets_owned: this.currentUser.pets_owned
	};

	_onHandleInputChange = (field: string, value: any) => {
		const pets_owned_copy: Array<Pet | object> = _.cloneDeep(this.state.pets_owned);
		_.set(pets_owned_copy, field, value);
		this.setState({ pets_owned: pets_owned_copy });
	}

	componentDidMount = () => {
		const pets_owned_copy: Array<Pet | object> = _.cloneDeep(this.state.pets_owned);
		pets_owned_copy.push({}); //For adding a new pet
		this.setState({ pets_owned: pets_owned_copy });
	}

	render() {
		const { pets_owned } = this.state;

		const petList: Array<any> = [];
		const totalPets: number = pets_owned.length;

		for (let i = 0; i < pets_owned.length; i++) {
			petList.push(this._renderPetProfile(i, pets_owned[i], totalPets));
		}

		return (
			<div className="my-pets">
				<h2>My Pets</h2>
				{ petList }
			</div>
		);
	};

	// TODO: change pet.profile, to pet
	_renderPetProfile(index: number, pet: Pet | object, totalPets: number) {
		return (
			<div key={ index }>
				<img src="https://i0.wp.com/www.oakridge.in/wp-content/uploads/2020/02/Sample-jpg-image-500kb.jpg" style={{ 'width': '100%', 'borderRadius': '5px', 'height': '250px', 'marginBottom': '20px' }}/>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control 
							type="text" 
							value={ "name" in pet ? pet.name : '' }
							onChange={ e => this._onHandleInputChange(`[${index}].name`, e.target.value) }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control 
							type="text"
							value={ "description" in pet ? pet.description : '' }
							onChange={ e => this._onHandleInputChange(`[${index}].description`, e.target.value) }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Date of Birth</Form.Label>
						<br />
						<DatePicker 
							value={ "date_of_birth" in pet 
								? new Date(pet.date_of_birth) 
								: new Date(Date.now()) }
							format="MM/dd/y"
							onChange={ date => this._onHandleInputChange(`[${index}].date_of_birth`, date) }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Gender</Form.Label>
						<Form.Check 
							type="radio"
							label="Male"
							checked={ "gender" in pet ? pet.gender === Gender.MALE : false }
							onChange={ e => this._onHandleInputChange(`[${index}].gender`, Gender.MALE) }/>
						<Form.Check 
							type="radio"
							label="Female"
							value={ Gender.FEMALE }
							checked={ "gender" in pet ? pet.gender === Gender.FEMALE : false }
							onChange={ e => this._onHandleInputChange(`[${index}].gender`, Gender.FEMALE) }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Picture Url</Form.Label>
						<Form.Control 
							type="text"
							value={ "picture_url" in pet ? pet.picture_url : '' }
							onChange={ e => this._onHandleInputChange(`[${index}].picture_url`, e.target.value) }/>
					</Form.Group>
				</Form>
				{ index !== totalPets - 1 
					? <div>
							<Button variant="primary" style={{ 'marginRight': '20px'}}>Update Pet</Button>
							<Button variant="danger">Delete Pet</Button>
						</div>
					: <Button variant="success">Add New Pet</Button>}
				{ index !== totalPets - 1 
					? <hr style={{ 'margin': '50px 0', 'border': '1px solid black' }}/> 
					: null }
			</div>
		);
	}
}

export default MyPetsSection;