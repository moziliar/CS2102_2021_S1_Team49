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
			{ transaction.pastTransactions.length !== 0
					? transaction.pastTransactions.map((txn, index) => {
							return <TransactionCard key={ index } transaction={ txn } hasFinished={ true }/>
						})
					: null
			}
		</div>
	);
}

export default PastTransactionsSection;