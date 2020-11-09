import React, { createContext, Component } from 'react';
import { mockTransactions } from '../../app/models/mockTxns';
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

    getPastTransactions = (email) => {
			API.get(`/txn/list`, { params: { email: email} })
				.then(res => {
					const pastTransactions = res.data.filter(t => t.is_selected &&  new Date(t.date_end).getTime() < new Date(Date.now()).getTime());
					this.setState({ pastTransactions: pastTransactions });
				});
    }

    getOngoingTransactions = (email) => {
			API.get(`/txn/list`, { params: { email: email} })
				.then(res => {
					console.log(res.data);
					const todayDate = new Date(Date.now()).getTime();
					const ongoingTransactions = res.data.filter(t => {
						const startDate = new Date(t.date_begin).getTime();
						const endDate = new Date(t.date_end).getTime();

						return t.is_selected && endDate >= todayDate;
					});
					this.setState({ ongoingTransactions: ongoingTransactions });
				});
    }

    getOngoingBids = (email) => {
			API.get('/bid/query', { params: {email: email }})
				.then(res => {
					const onGoingBids = res.data.filter(t => !t.is_selected);
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