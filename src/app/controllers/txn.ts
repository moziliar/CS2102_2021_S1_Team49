import { mockTransactions } from '../models/mockTxns'
import { Transaction } from '../models/txns'
import { db } from '../dbconfig/db';
import {
  listTnxByUserId,
  createTransactionInfo,
  updateTransactionInfo,
  acceptBidByParams,
  getTxnByTxnInfo,
  reviewTransactionQuery
} from '../sql_query/query';


// export const ListTxnByUserID = (req, res) => {
//   res.json(mockTransactions)
// }

export const ListTxnByUserID = async (req, res) => {
  console.log(req.query);
  const userTnx =  await db.query({
    text: listTnxByUserId,
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

  res.json(txn);
}

export const ListTxnByCaretaker = async (req, res) => {
  console.log(req.query);
  const userTnx =  await db.query({
    text: listTnxByUserId,
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

  res.json(txn);
}

export const CreateTransactionInfo = async (req, res) => {
  await db.query({
    text: createTransactionInfo,
    values: [req.body.pet_owner,
             req.body.pet,
             req.body.care_taker,
             req.body.date_begin,
             req.body.date_end,
             req.body.transfer_method,
             req.body.location,
             req.body.total_price,
             req.body.is_active,
             req.body.is_selected,
             req.body.cc_number,
             req.body.rating,
             req.body.review
            ],
  }).then(async query => {
    if (query.rowCount > 0) {
      const txns = await GetTransactionByTransactionInfo(req.body.pet_owner, req.body.pet_name, req.body.care_taker, req.body.date_begin, req.body.date_end, req.body.is_selected);
      res.json(txns);
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
             req.body.pet,
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
    await GetTransactionByTransactionInfo(req.body.pet_owner, req.body.pet, req.body.care_taker, req.body.date_begin, req.body.date_end, req.body.is_selected)
      .then(txns => {
        res.json(txns);
      })
    })
    .catch(err => {
      res.status(404).json({ errMessage: 'Fail updating transaction basic information' });
    })
}

export const ReviewTransactionHandler = async (req, res) => {
  console.log(req.body)
  db.query({
    text: reviewTransactionQuery,
    values: [
      req.body.owner,
      req.body.pet_name,
      req.body.care_taker,
      req.body.date_begin,
      req.body.date_end,
      req.body.rating,
      req.body.review
    ],
  }).then(r => {
    GetTransactionByTransactionInfo(req.body.owner, req.body.pet_name, req.body.care_taker, req.body.date_begin, req.body.date_end, true)
      .then(txn => {
        res.json(txn);
      })
  }).catch(err => {
      res.status(404).json({ errMessage: 'Fail adding review to past transaction' });
    })
}

export const AcceptBidByParams = async (req, res) => {
  console.log(
    req.body.owner,
    req.body.pet_name,
    req.body.care_taker,
    req.body.date_begin,
    req.body.date_end,
  );
  db.query({
    text: acceptBidByParams,
    values: [
      req.body.owner,
      req.body.pet_name,
      req.body.care_taker,
      req.body.date_begin,
      req.body.date_end,
    ],
  }).then(r => {
    console.log(r);
    GetTransactionByTransactionInfo(req.body.owner, req.body.pet_name, req.body.care_taker, req.body.date_begin, req.body.date_end, true)
      .then(txn => {
        res.json(txn);
      })
  }).catch(err => {
      res.status(404).json({ errMessage: 'Fail updating transaction basic information' });
    })
}

export const GetTransactionByTransactionInfo = async (
  pet_owner: string, pet: string, care_taker: string, date_begin: string, date_end: string, is_selected: boolean) => {
  // if is_selected == false return error
  // if pet_owner, caretaker, date_begin and date_end are empty, return error
  const txns = await db.query({
    text: getTxnByTxnInfo,
    values: [
      pet_owner,
      pet,
      care_taker,
      new Date(date_begin),
      new Date(date_end),
      is_selected
    ],
  });

  return txns.rows;
}
