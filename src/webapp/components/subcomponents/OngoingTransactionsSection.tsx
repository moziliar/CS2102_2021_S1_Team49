import React, { useContext, useEffect } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { TransactionContext } from '../../contexts/TransactionContext';
import TransactionCard from './TransactionCard';

const OngoingTransactionsSection = () => {
	const user = useContext(UserContext);
	const transaction = useContext(TransactionContext);

	useEffect(() => {
		console.log(user.currentUser);
		console.log(transaction.getOngoingTransactions);
		if (user.currentUser && transaction.getOngoingTransactions) {
			transaction.getOngoingTransactions(user.currentUser.email);
		}
  }, [])

	return (
		<div>
			<h4 style={{ 'margin': '15px' }}>You currently have { transaction.ongoingTransactions.length } ongoing transaction(s)</h4>
			<ul style={{ 'margin': '20px 15px', 'padding': '0' }}>
				<li style={{ 'display': 'inline-block' }}>
					<div style={{ 'position': 'relative', 'top': '10px', 'display': 'inline-block', 'marginRight': '10px', 'width': '30px', 'height': '30px', 'backgroundColor': '#ccedff' }} />
					As Pet Owner
				</li>
				<li style={{ 'display': 'inline-block' }}>
				<div style={{ 'position': 'relative', 'top': '10px', 'display': 'inline-block', 'margin': '0 10px', 'width': '30px', 'height': '30px', 'backgroundColor': '#ccffe5' }} />
					As Care Taker
				</li>
			</ul>
			{ transaction.ongoingTransactions.length !== 0
					? transaction.ongoingTransactions.map((txn, index) => {
							return <TransactionCard key={ index } transaction={ txn }/>
						})
					: null
			}
		</div>
	);
}

export default OngoingTransactionsSection;