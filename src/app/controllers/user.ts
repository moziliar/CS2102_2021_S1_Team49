import { mockUsers } from '../models/mockUsers';

export const LoginHandler = (req, res) => {
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
