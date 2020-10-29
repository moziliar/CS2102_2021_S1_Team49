import { mockUsers } from '../models/mockUsers';
import { db } from '../dbconfig/db';
import { loginQuery, createUserQuery, updateUserQuery, searchUserByEmailQuery } from '../sql_query/query';

export const LoginHandler = async (req, res) => {
  const users = await db.query({
    text: loginQuery,
    values: [req.body.email, req.body.password],
  })

  if (users.rows.length > 0) {
    res.json(mockUsers[0]);
  }

  res.status(401).json({ errMessage: 'Username and Password do not match' });
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
