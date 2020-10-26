import React, { useContext, useEffect } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { TransactionContext } from '../../contexts/TransactionContext';
import TransactionCard from './TransactionCard';

const OngoingTransactionsSection = () => {
	const user = useContext(UserContext);
	const transaction = useContext(TransactionContext);

	useEffect(() => {
		if (user.currentUser && transaction.getOngoingTransactions) {
			transaction.getOngoingTransactions(user.currentUser.email);
		}
  }, [])

	return (
		<div>
			<h4 style={{ 'margin': '15px' }}>You currently have { transaction.ongoingTransactions.length } ongoing transaction(s)</h4>
			{ transaction.ongoingTransactions.length !== 0
					? transaction.ongoingTransactions.map((txn, index) => {
							return <TransactionCard key={ index } transaction={ txn } hasFinished={ false } isBid={ false }/>
						})
					: null
			}
		</div>
	);
}

export default OngoingTransactionsSection;