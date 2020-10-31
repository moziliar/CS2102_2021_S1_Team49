import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-date-picker";
import _ from 'lodash';

import { User } from '../../../app/models/users';
import { Pet, Category } from '../../../app/models/pets';
import { UserContext } from '../../contexts/UserContext';
import API from '../../api';

const FEMALE = "Female";
const MALE = "Male";

type IState = {
	pets_owned: Array<Pet | object>,
	categories: Array<Category> | null,
}

class MyPetsSection extends Component<{}, IState> {
	static contextType = UserContext;
	currentUser: User = this.context.currentUser;

	state: IState = {
		pets_owned: this.currentUser.pets_owned,
		categories: null
	};

	_onHandleInputChange = (field: string, value: any) => {
		console.log(field, value)
		const pets_owned_copy: Array<Pet | object> = _.cloneDeep(this.state.pets_owned);
		_.set(pets_owned_copy, field, value);
		this.setState({ pets_owned: pets_owned_copy });
	}

	_addNewPet = (index: number) => {
		const { pets_owned } = this.state;
		this.context.addNewPet(this.currentUser.email, pets_owned[index]);
	}

	_updatePet = (pet: Pet) => {
		this.context.updatePet(this.currentUser.email, pet);
	}

	_deletePet = (name: string) => {
		this.context.deletePet(name, this.currentUser.email);
	}

	componentDidUpdate = () => {
		if (this.context.currentUser.pets_owned.length !== this.state.pets_owned.length) {
			this.setState({ pets_owned: this.context.currentUser.pets_owned });
		}
	}

	componentDidMount = () => {
		API.get('/categories/list')
			.then(res => {
				this.setState({ categories: res.data });
			})
			.catch(err => {
				alert(err);
			})
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
		const { categories } = this.state;

		return (
			<div key={ index }>
				<Form>
					<Form.Group>
						<Form.Label>Name <small style={{ 'color': 'red' }}>(Once added, can't be change)</small></Form.Label>
						<Form.Control 
							type="text" 
							disabled= { index !== totalPets - 1 }
							value={ "name" in pet ? pet.name : '' }
							onChange={ e => this._onHandleInputChange(`[${index}].name`, e.target.value) }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Category</Form.Label><br />
						{ categories?.map(c => {
							return (
								<Form.Check 
									key={ c.name }
									inline
									type="radio"
									label={ c.name }
									checked={ "category" in pet ? pet.category === c.name : false }
									onChange={ e => this._onHandleInputChange(`[${index}].category`, c.name) }/>
							);
						}) }
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control 
							type="text"
							value={ "description" in pet ? pet.description : '' }
							onChange={ e => this._onHandleInputChange(`[${index}].description`, e.target.value) }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Special Requirements</Form.Label>
						<Form.Control 
							type="text"
							value={ "special_requirements" in pet ? pet.special_requirements : '' }
							onChange={ e => this._onHandleInputChange(`[${index}].special_requirements`, e.target.value) }/>
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
							label={ MALE }
							checked={ "gender" in pet ? pet.gender === MALE : false }
							onChange={ e => this._onHandleInputChange(`[${index}].gender`, MALE) }/>
						<Form.Check 
							type="radio"
							label={ FEMALE }
							checked={ "gender" in pet ? pet.gender === FEMALE : false }
							onChange={ e => this._onHandleInputChange(`[${index}].gender`, FEMALE) }/>
					</Form.Group>
				</Form>
				{ index !== totalPets - 1 
					? 	<div>
							<Button variant="primary"  onClick={ () => this._updatePet(pet) } style={{ 'marginRight': '20px'}}>Update Pet</Button>
							<Button variant="danger" onClick={ () => this._deletePet(pet.name) }>Delete Pet</Button>
							<hr style={{ 'margin': '50px 0', 'border': '1px solid black' }}/> 
						</div>
					: <Button variant="success" onClick={ () => this._addNewPet(index) }>Add New Pet</Button> 
				}
			</div>
		);
	}
}

export default MyPetsSection;