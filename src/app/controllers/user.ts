import { mockUsers } from '../models/mockUsers';
import { db } from '../dbconfig/db';
import {
  loginQuery, createUserQuery, updateUserQuery, searchUserByEmailQuery,
  queryPetQuery,
  queryCreditCard,
  queryCaretaker, queryAvailabiliies
} from '../sql_query/query';

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

  const user = usersRet.rows[0];

  const petsRet = await db.query({
    text: queryPetQuery,
    values: [user.email],
  })

  const creditCardRet = await db.query({
    text: queryCreditCard,
    values: [user.email],
  })

  const isCaretakerRet = await db.query({
    text: queryCaretaker,
    values: [user.email],
  })

  const isCaretaker = isCaretakerRet.rows.length > 0;

  if (!isCaretaker) {
    res.json({
      ...user,
      pets_owned: petsRet.rows,
      credit_card: creditCardRet.rows[0],
    });

    return;
  }

  if (isCaretakerRet.rows[0].is_part_time) {
    const availabilitiesRet = await db.query({
      text: queryAvailabiliies,
      values: [user.email],
    })

    res.json({
      ...user,
      pets_owned: petsRet.rows,
      credit_card: creditCardRet.rows[0],
      is_part_time: isCaretakerRet.rows[0],
      leave_or_avail: availabilitiesRet.rows.map(ret => {
        return {
          start_date: ret.start_date,
          end_date: ret.end_date,
        }
      })
    });
  } else {
    const leavesRet = await db.query({
      text: queryAvailabiliies,
      values: [user.email],
    })

    res.json({
      ...user,
      pets_owned: petsRet.rows,
      credit_card: creditCardRet.rows[0],
      is_part_time: isCaretakerRet.rows[0].is_part_time,
      leave_or_avail: leavesRet.rows.map(ret => {
        return {
          start_date: ret.start_date,
          end_date: ret.end_date,
        }
      })
    });
  }
};
// user -> {email, password, name, phone, pic_url, is_admin}

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
  }).then(query => {
    // Success creating user
    if (query.rowCount > 0) {
      res.json(mockUsers[0]);
    }
  }).catch(err => {
    res.status(401).json({ errMessage: 'Email has been taken. User other email' });
  })
}
// user -> {email, name, phone, pic_url}

export const UpdateUserHandler = async (req, res) => {
  await db.query({
    text: updateUserQuery,
    values: [req.body.email,
             req.body.name,
             req.body.phone,
             req.body.pic_url],
  }).then(async r => { 
    await GetUserByEmail(req, res)
      .then(user => {
        res.json(user);
      })
    })
    .catch(err => {
      res.status(401).json({ errMessage: 'Fail updating basic information' });
    })
}

export const GetUserByEmail = async (req, res) => {
  return await db.query({
    text: searchUserByEmailQuery,
    values: [req.body.email],
  }).then(query => mockUsers[0]);
}

export const DeleteUserHandler = (req, res) => {
  res.json(mockUsers[0]);
}
