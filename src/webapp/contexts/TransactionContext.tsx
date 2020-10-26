import React, { createContext, Component } from 'react';
import { Transaction } from '../../app/models/txns';
import API from '../api';

type contextState = {
    pastTransactions: Array<Transaction>,
    ongoingTransactions: Array<Transaction>,
    ongoingBids: Array<Transaction>,
    getPastTransactions: ((email: (string | null)) => void) | null,
    getOngoingTransactions: ((email: (string | null)) => void) | null,
    getOngoingBids: ((email: (string | null)) => void) | null
};

export const TransactionContext = createContext<contextState>({
    pastTransactions: [],
    ongoingTransactions: [],
    ongoingBids: [],
    getPastTransactions: null,
    getOngoingTransactions: null,
    getOngoingBids: null
});

class TransactionContextProvider extends Component<{}, contextState> {
    state: contextState = {
        pastTransactions: [],
        ongoingTransactions: [],
        ongoingBids: [],
        getPastTransactions: null,
        getOngoingTransactions: null,
        getOngoingBids: null
    }

    getPastTransactions = () => {
			API.get('/txn/list')
				.then(res => {
					const pastTransactions = res.data.filter(t => t.info.is_selected &&  new Date(t.info.end_date).getTime() < new Date(Date.now()).getTime());
					this.setState({ pastTransactions: pastTransactions });
				});
    }

    getOngoingTransactions = () => {
			API.get('/txn/list')
				.then(res => {
					const todayDate = new Date(Date.now()).getTime();
					const ongoingTransactions = res.data.filter(t => {
						const startDate = new Date(t.info.start_date).getTime();
						const endDate = new Date(t.info.end_date).getTime();

						return t.info.is_selected && startDate <= todayDate && endDate >= todayDate;
					});
					this.setState({ ongoingTransactions: ongoingTransactions });
				});
    }

    getOngoingBids = () => {
			API.get('/txn/list')
				.then(res => {
					const onGoingBids = res.data.filter(t => !t.info.is_selected);
					this.setState({ ongoingBids: onGoingBids });
				});
    }

    render() {
		return (
			<TransactionContext.Provider value={{ ...this.state, 
				getPastTransactions: this.getPastTransactions, 
				getOngoingTransactions: this.getOngoingTransactions, 
				getOngoingBids: this.getOngoingBids }}>
					{ this.props.children }
			</TransactionContext.Provider>
		);
	}
}

export default TransactionContextProvider;