import { Bid } from './bids';
import { mockTransactions } from './mockTxns'


export const mockBids: Array<Bid> = [
  {
    bid_id: 1,
    info: mockTransactions[0]["info"],
    is_selected: true,
    bid_end_date: '15.09.2019',
    is_active: true,
  }
]