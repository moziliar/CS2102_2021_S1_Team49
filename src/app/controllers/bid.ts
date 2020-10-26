import { mockBids } from '../models/mockBids'
import { mockTransactions } from '../models/mockTxns'

export const ListAllBids = (req, res) => {
  res.json(mockBids);
}

export const ListTnxByOwnerID = (req, res) => {
    res.json(mockTransactions);
}

export const AddBid = (req, res) => {
}

export const UpdateBid = (req, res) => {
}

export const DeleteBid = (req, res) => {
}