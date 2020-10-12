import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { UserContext } from '../../contexts/UserContext';

class MyPetsSection extends Component {
	static contextType = UserContext;

	render() {
		const { pets_owned } = this.context.currentUser;

		const pets = [];
		const totalPets = pets_owned.length;

		for (let i = 0; i < pets_owned.length; i++) {
			console.log(pets_owned[i])
			pets.push(this._renderPetProfile(i, pets_owned[i], totalPets));
		}

		// Add empty pet to add
		pets.push(this._renderPetProfile(totalPets, null, totalPets));

		return (
			<div className="my-pets">
				<h2>My Pets</h2>
				{ pets }
			</div>
		);
	};

	// TODO: change pet.profile, to pet
	_renderPetProfile(index, pet, totalPets) {
		const ownedPet = index !== totalPets;

		return (
			<div key={ index }>
				<img src="https://i0.wp.com/www.oakridge.in/wp-content/uploads/2020/02/Sample-jpg-image-500kb.jpg" style={{ 'width': '100%', 'borderRadius': '5px', 'height': '250px', 'marginBottom': '20px' }}/>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" value={ ownedPet ? pet.profile.name : ''}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" value={ ownedPet ? pet.profile.description : '' }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Date of Birth</Form.Label>
						<Form.Control type="text" value={ ownedPet ? pet.profile.date_of_birth : '' }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Gender</Form.Label>
						<Form.Control type="text" value={ ownedPet ? pet.profile.gender : '' }/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Picture Url</Form.Label>
						<Form.Control type="text" value={ ownedPet ? pet.profile.picture_url : '' }/>
					</Form.Group>
				</Form>
				{ ownedPet 
					? <div>
							<Button variant="primary" style={{ 'marginRight': '20px'}}>Update Pet</Button>
							<Button variant="danger">Delete Pet</Button>
						</div>
					: <Button variant="success">Add New Pet</Button>}
				{ ownedPet 
					? <hr style={{ 'margin': '50px 0', 'border': '1px solid black' }}/> 
					: null }
			</div>
		);
	}
}

export default MyPetsSection;