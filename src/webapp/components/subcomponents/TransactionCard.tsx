import React from 'react';
import { Form } from 'react-bootstrap';

import { Transaction } from '../../../app/models/txns';

type IProps = {
	transaction: Transaction,
	hasFinished: boolean,
	isBid: boolean
}

const TransactionCard = (props: IProps) => {
	return (
		<div style={{ 'backgroundColor': '#CCFFE5', 'padding': '20px', 'borderRadius': '5px', 'margin': '15px' }}>
			<p>Taker Name: { props.transaction.info.care_taker.name } </p>
			<p>Period: { props.transaction.info.start_date } - { props.transaction.info.end_date } ({ props.isBid ? 'You bid for: ' : '' }${props.transaction.info.total_price})</p>
			<p>Pet Info: { props.transaction.info.pet.name } ({ props.transaction.info.pet.category.name })</p>
			{ props.hasFinished 
					? props.transaction.review.description
						?	<p>Review: { props.transaction.review.description } ({ props.transaction.review.rating }/5)</p>
						: <Form style={{ 'marginTop': '10px' }}>
								<small style={{ 'color': 'red' }}>You haven't review the care taker. Give your review now</small><br />
								<Form.Control as="textarea" rows={ 2 } placeholder="Enter your review"/>
								<div style={{ 'marginTop': '10px' }}>
									<Form.Control type="number" placeholder="Give your rating(1-5)" max={ 5 } min={ 1 } style={{ 'width': '40%', 'display': 'inline', 'marginRight': '20px' }}/>
									<input type="submit" />
								</div>
							</Form>
					: null // Review only for finished transactions
			}
		</div>
	);
}

export default TransactionCard;