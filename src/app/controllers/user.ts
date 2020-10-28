import { mockUsers } from '../models/mockUsers';
import { db } from '../dbconfig/db';
import { loginQuery } from '../sql_query/query';

export const LoginHandler = async (req, res) => {
  const users = await db.query({
    text: loginQuery,
    values: [req.body.email, req.body.password],
  })

  if (users.rows.length > 0) {
    res.json(mockUsers[0]);
  }
  console.log(users.rows[0]);

  res.json(mockUsers[0]);
};

export const CreateUserHandler = (req, res) => {
  res.json(mockUsers[0]);
}

export const UpdateUserHandler = (req, res) => {
  res.json(mockUsers[0]);
}

export const DeleteUserHandler = (req, res) => {
  res.json(mockUsers[0]);
}
