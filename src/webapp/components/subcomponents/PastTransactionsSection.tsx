import React, { useContext, useEffect } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { TransactionContext } from '../../contexts/TransactionContext';
import TransactionCard from './TransactionCard';

const PastTransactionsSection = () => {
	const user = useContext(UserContext);
	const transaction = useContext(TransactionContext);

	useEffect(() => {
		if (user.currentUser && transaction.getPastTransactions) {
			transaction.getPastTransactions(user.currentUser.email);
		}
  	}, [])

	return (
		<div>
			<h4 style={{ 'margin': '15px' }}>You currently have { transaction.pastTransactions.length } past transaction(s)</h4>
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
			{ transaction.pastTransactions.length !== 0
					? transaction.pastTransactions.map((txn, index) => {
							return <TransactionCard key={ index } transaction={ txn }/>
						})
					: null
			}
		</div>
	);
}

export default PastTransactionsSection;