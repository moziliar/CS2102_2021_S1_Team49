import { mockTransactions } from '../models/mockTxns'
import { Transaction } from '../models/txns'
import { db } from '../dbconfig/db';
import {
  listTnxByOwnerId,
  createTransactionInfo,
  updateTransactionInfo
} from '../sql_query/query';


// export const ListTxnByUserID = (req, res) => {
//   res.json(mockTransactions)
// }

export const ListTxnByUserID = async (req, res) => {
  const userTnx =  await db.query({
    text: listTnxByOwnerId,
    values: [req.query.email],
  });
  const txn: Array<Transaction> = userTnx.rows.map(_txn => {
    return {
      pet_owner: _txn.pet_owner,
      pet_name: _txn.pet_name,
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

  res.json(txn);
}

export const CreateTransactionInfo = async (req, res) => {
  await db.query({
    text: createTransactionInfo,
    values: [req.body.pet_owner,
             req.body.pet_name,
             req.body.care_taker,
             req.body.date_begin,
             req.body.date_end,
             req.body.transfer_method,
             req.body.location,
             req.body.total_price,
             req.body.is_active,
             req.body.is_selected,
             req.body.payment_method,
             req.body.cc_number,
             req.body.rating,
             req.body.review
            ],
  }).then(async query => {
    // Success creating user
    if (query.rowCount > 0) {
      const user = await GetTransactionByTransactionInfo(req.body.pet_owner, req.body.care_taker, req.body.date_begin, req.body.date_end, req.body.is_selected);
      res.json(user);
    }
  }).catch(err => {
    console.log(err)
    res.status(404).json({ errMessage: 'Invalid transaction input provided' });
  })
}

export const UpdateTransactionInfo = async (req, res) => {
  await db.query({
    text: updateTransactionInfo,
    values: [req.body.pet_owner,
             req.body.pet_name,
             req.body.care_taker,
             req.body.date_begin,
             req.body.date_end,
             req.body.transfer_method,
             req.body.location,
             req.body.total_price,
             req.body.is_active,
             req.body.is_selected,
             req.body.payment_method,
             req.body.cc_number,
             req.body.rating,
             req.body.review
            ],
  }).then(async r => { 
    GetTransactionByTransactionInfo(req.body.pet_owner, req.body.care_taker, req.body.date_begin, req.body.date_end, req.body.is_selected)
      .then(user => {
        res.json(user);
      })
    })
    .catch(err => {
      res.status(404).json({ errMessage: 'Fail updating transaction basic information' });
    })
}

export const GetTransactionByTransactionInfo = async (pet_owner: string, care_taker: string, date_begin: string, date_end: string, is_selected: boolean) => {
  // if is_selected == false return error
  // if pet_owner, caretaker, date_begin and date_end are empty, return error
  
  return {

  }
}