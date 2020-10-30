import { mockUsers } from '../models/mockUsers';
import { db } from '../dbconfig/db';
import {
  loginQuery, createUserQuery, updateUserQuery, searchUserByEmailQuery,
  queryPetQuery,
  queryCreditCard,
  queryCaretaker, queryAvailabiliies, addCreditCardQuery, deleteCreditCardQuery
} from '../sql_query/query';

// ================================ USER =========================================

export const LoginHandler = async (req, res) => {
  const usersRet = await db.query({
    text: loginQuery,
    values: [req.body.email, req.body.password],
  })

  if (usersRet.rows.length === 0) {
    res.status(401).json({ errMessage: 'No such user or Username and Password do not match' });
  } else if (usersRet.rows.length > 1) {
    res.status(502).json({ errMessage: 'More than one user found'});
  }

  const user = await GetUserByEmail(usersRet.rows[0].email);
  res.json(user);
};

export const CreateUserHandler = async (req, res) => {
  const newUser = await db.query({
    text: createUserQuery,
    values: [req.body.email, 
             req.body.password, 
             req.body.name, 
             req.body.phone, 
             req.body.pic_url, 
             req.body.is_admin
            ]
  }).then(async query => {
    // Success creating user
    if (query.rowCount > 0) {
      const user = await GetUserByEmail(req.body.email);
      res.json(user);
    }
  }).catch(err => {
    res.status(401).json({ errMessage: 'Email has been taken. User other email' });
  })
}

export const UpdateUserHandler = async (req, res) => {
  await db.query({
    text: updateUserQuery,
    values: [req.body.email,
             req.body.name,
             req.body.phone,
             req.body.pic_url], 
  }).then(async r => { 
    await GetUserByEmail(req.body.email)
      .then(user => {
        res.json(user);
      })
    })
    .catch(err => {
      res.status(401).json({ errMessage: 'Fail updating basic information' });
    })
}

export const DeleteUserHandler = (req, res) => {
  res.json(mockUsers[0]);
}

// ================================ CREDIT CARD =========================================

export const AddCreditCardHandler = async (req, res) => {
  const cardsRet = await db.query({
    text: addCreditCardQuery,
    values: [req.body.email,
             req.body.cc_number,
             req.body.holder_name,
             req.body.expiry_date
            ]
  }).then(async r => {
    await GetUserByEmail(req.body.email)
      .then(user => {
        res.json(user);
      })
  })
  .catch(err => {
    res.status(401).json({ errMessage: 'Please ensure all fields are not empty, card number is unique, and expiry date is after today\' date' });
  })

}

export const DeleteCreditCardHandler = async (req, res) => {
  console.log(req.query);
  const cardsRet = await db.query({
    text: deleteCreditCardQuery,
    values: [req.query.email, req.query.cc_number]
  }).then(async r => {
    console.log(req.query);
    await GetUserByEmail(req.query.email)
      .then(user => {
        res.json(user);
      })
  })
  .catch(err => {
    console.log(err)
    res.status(401).json({ errMessage: 'Fail removing card. Please try again later.' });
  })
}

// ================================== HELPERS ===========================================

export const GetUserByEmail = async (email: string) => {
  const userRet =  await db.query({
    text: searchUserByEmailQuery,
    values: [email],
  });

  const user = userRet.rows[0];

  const petsRet = await db.query({
    text: queryPetQuery,
    values: [email],
  })

  const creditCardRet = await db.query({
    text: queryCreditCard,
    values: [email],
  })

  const isCaretakerRet = await db.query({
    text: queryCaretaker,
    values: [email],
  })

  const isCaretaker = isCaretakerRet.rows.length > 0;

  if (!isCaretaker) {
    return {
      ...user,
      pets_owned: petsRet.rows || [],
      credit_card: creditCardRet.rows.concat({}) || [{}],
    };
  }

  if (isCaretakerRet.rows[0].is_part_time) {
    const availabilitiesRet = await db.query({
      text: queryAvailabiliies,
      values: [email],
    })

    return {
      ...user,
      pets_owned: petsRet.rows || [],
      credit_card: creditCardRet.rows.concat({}) || [{}],
      is_part_time: isCaretakerRet.rows[0],
      leave_or_avail: availabilitiesRet.rows.map(ret => {
        return {
          start_date: ret.start_date,
          end_date: ret.end_date,
        }
      })
    }
  } else {
    const leavesRet = await db.query({
      text: queryAvailabiliies,
      values: [email],
    });

    return {
      ...user,
      pets_owned: petsRet.rows || [],
      credit_card: creditCardRet.rows.concat({}) || [{}],
      is_part_time: isCaretakerRet.rows[0].is_part_time,
      leave_or_avail: leavesRet.rows.map(ret => {
        return {
          start_date: ret.start_date,
          end_date: ret.end_date,
        }
      })
    }
  }
}