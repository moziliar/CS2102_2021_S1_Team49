import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { Transaction } from '../../../app/models/txns';
import { User } from '../../../app/models/users';
import API from '../../api';
import { TransactionContext } from '../../contexts/TransactionContext';
import { UserContext } from '../../contexts/UserContext';

type IProps = {
	transaction: Transaction,
	isBid: boolean,
	isOngoing: boolean
}

const TransactionCard = (props: IProps) => {
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);
	const userContext = useContext(UserContext);
	const transactionContext = useContext(TransactionContext);

	const currentUser: User | null = userContext.currentUser;
	const { transaction, isBid } = props;

	const req = {
		care_taker: transaction.care_taker,
		owner: transaction.pet_owner,
		pet_name: transaction.pet,
		date_begin: transaction.date_begin,
		date_end: transaction.date_end
	}
	
	// Link to API
	const _onHandleAcceptBid = () => {
		API.put('/bid/accept', req)
			.then(res => {
				alert('Bid accepted!')
				transactionContext.getOngoingBids(currentUser.email);
				transactionContext.getOngoingTransactions(currentUser.email);
			})
			.catch(err => {
				alert(err.response.data.errMessage)
			})
	};

	const _formatDate = (date: string) => {
		const d = new Date(date);
		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' +  d.getDate();
	}

	const _onHandleAddReview = () => {
		const request = {
			...req,
			review: review,
			rating: rating
		}

		API.put('/txn/addreview', request)
			.then(res => {
				alert('Review added')
				transactionContext.getPastTransactions(currentUser.email);
			})
			.catch(err => {
				alert(err.response.data.errMessage)
			})
	}

	const isCareTaker = currentUser?.email === transaction.care_taker;
	const backgroundColor: string = isCareTaker ? '#ccffe5' : '#ccedff'
	
	return (
		<div style={{ 'backgroundColor': backgroundColor, 'padding': '20px', 'borderRadius': '5px', 'margin': '15px' }}>
			<p>{ isCareTaker ? 'Owner' : 'Taker' } Email: { isCareTaker ? props.transaction.pet_owner : props.transaction.care_taker } </p>
			<p>Period: { _formatDate(transaction.date_begin) } - { _formatDate(transaction.date_end) } ({ transaction.is_active ? !isCareTaker ? 'You bid for: ' : 'The owner bid for:' : '' }${props.transaction.total_price / 100})</p>
			<p>Pet Name: { transaction.pet }</p>
			{ isBid
				? <button onClick={ _onHandleAcceptBid }>Accept Bid</button>
				: transaction.review
					? <p>Review: { transaction.review } ({ transaction.rating }/5)</p>
					: !isCareTaker 
						? <Form style={{ 'marginTop': '10px' }}>
							<small style={{ 'color': 'red' }}>You haven't review the care taker. Give your review now</small><br />
							<Form.Control 
								as="textarea" 
								rows={ 2 } 
								placeholder="Enter your review" 
								value={ review }
								disabled={ props.isOngoing }
								onChange={ (e) => setReview(e.target.value) }/>
							<div style={{ 'marginTop': '10px' }}>
								<Form.Control 
									value={ rating } 
									type="number" 
									placeholder="Give your rating(1-5)" 
									disabled={ props.isOngoing }
									max={ 5 } 
									min={ 1 } 
									style={{ 'width': '40%', 'display': 'inline', 'marginRight': '20px' }}
									onChange={ (e) => setRating(parseInt(e.target.value)) }/>
								<Button disabled={ props.isOngoing } onClick={ _onHandleAddReview }>Submit Review</Button>
							</div>
						</Form>
						: <small style={{ 'color': 'red' }}>*Owner has not give you any review</small>
			}
		</div>
	);
}

export default TransactionCard;