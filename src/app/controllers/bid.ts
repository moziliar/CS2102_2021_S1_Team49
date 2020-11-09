import { mockBids } from '../models/mockBids'
import { mockTransactions } from '../models/mockTxns'
import { listBidByTakerId } from '../sql_query/query'
import { Transaction } from '../models/txns'
import { db } from '../dbconfig/db'

export const ListAllBids = (req, res) => {
  db.query({
    text: '',
  })

  res.json(mockBids);
}

export const ListBidByOwnerID = async (req, res) => {
  const userTnx =  await db.query({
    text: listBidByTakerId,
    values: [req.query.email],
  });
  const txn: Array<Transaction> = userTnx.rows.map(_txn => {
    return {
      pet_owner: _txn.pet_owner,
      pet: _txn.pet,
      care_taker: _txn.caretaker,
      location: _txn.location,
      date_begin: _txn.start_date,
      date_end: _txn.end_date,
      total_price: _txn.total_price,
      transfer_method: _txn.transfer_method,
      is_selected: _txn.is_selected,
      is_active: _txn.is_active,
      payment_method: _txn.payment_method,
      cc_number: _txn.cc_number,
      rating: _txn.rating,
      review: _txn.review};
  })

  console.log(txn);
  res.json(txn);
}

export const AddBid = (req, res) => {
}

export const UpdateBid = (req, res) => {
}

export const DeleteBid = (req, res) => {
}