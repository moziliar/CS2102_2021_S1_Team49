import { mockBids } from '../models/mockBids'
import { mockTransactions } from '../models/mockTxns'
import { db } from '../dbconfig/db'

export const ListAllBids = (req, res) => {
  db.query({
    text: '',
  })

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