import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';

import { Transaction } from '../../../app/models/txns';
import { User } from '../../../app/models/users';
import { UserContext } from '../../contexts/UserContext';

type IProps = {
	transaction: Transaction,
}

const TransactionCard = (props: IProps) => {
	const userContext = useContext(UserContext);
	const currentUser: User | null= userContext.currentUser;
	const isCareTaker = currentUser?.email === props.transaction.care_taker;
	const backgroundColor: string = isCareTaker ? '#ccffe5' : '#ccedff'
	
	return (
		<div style={{ 'backgroundColor': backgroundColor, 'padding': '20px', 'borderRadius': '5px', 'margin': '15px' }}>
			<p>{ isCareTaker ? 'Owner' : 'Taker' } Email: { isCareTaker ? props.transaction.pet_owner : props.transaction.care_taker } </p>
			<p>Period: { props.transaction.date_begin } - { props.transaction.date_end } ({ props.transaction.is_active ? !isCareTaker ? 'You bid for: ' : 'The owner bid for:' : '' }${props.transaction.total_price})</p>
			<p>Pet Name: { props.transaction.pet_name }</p>
			{ !props.transaction.is_active 
					? props.transaction.review 
						? <p>Review: { props.transaction.review } ({ props.transaction.rating }/5)</p>
						: !isCareTaker ? <Form style={{ 'marginTop': '10px' }}>
											<small style={{ 'color': 'red' }}>You haven't review the care taker. Give your review now</small><br />
											<Form.Control as="textarea" rows={ 2 } placeholder="Enter your review"/>
											<div style={{ 'marginTop': '10px' }}>
												<Form.Control type="number" placeholder="Give your rating(1-5)" max={ 5 } min={ 1 } style={{ 'width': '40%', 'display': 'inline', 'marginRight': '20px' }}/>
												<input type="submit" />
											</div>
										 </Form>
										 : <small style={{ 'color': 'red' }}>*Owner has not give you any review</small>
					: null // Review only for finished transactions
			}
		</div>
	);
}

export default TransactionCard;