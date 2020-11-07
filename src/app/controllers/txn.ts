import { mockTransactions } from '../models/mockTxns'

export const ListTxnByUserID = (req, res) => {
  res.json(mockTransactions)
}