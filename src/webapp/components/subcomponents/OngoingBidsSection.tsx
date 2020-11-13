import React, { useContext, useEffect } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { TransactionContext } from '../../contexts/TransactionContext';
import TransactionCard from './TransactionCard';

const OngoingBidsSection = () => {
	const user = useContext(UserContext);
	const transaction = useContext(TransactionContext);

	useEffect(() => {
		if (user.currentUser && transaction.getOngoingBids) {
			transaction.getOngoingBids(user.currentUser.email);
		}
  }, [])

	return (
		<div>
			<h4 style={{ 'margin': '15px' }}>You currently have { transaction.ongoingBids.length } ongoing bid(s)</h4>
			{ transaction.ongoingBids.length !== 0
				? transaction.ongoingBids.map((txn, index) => {
					return <TransactionCard key={ index } transaction={ txn } isBid={ true } isOngoing={ true }/>
				})
				: null
			}
		</div>
	);
}

export default OngoingBidsSection;