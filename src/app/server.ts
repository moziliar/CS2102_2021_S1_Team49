import { LoginHandler, CreateUserHandler, UpdateUserHandler, DeleteUserHandler } from './controllers/user'
import { CreatePetHandler, UpdatePetHandler, DeletePetHandler } from './controllers/pet'
import { ListTxnByUserID } from './controllers/txn'
import { ListAllBids, ListTnxByOwnerID } from './controllers/bid';
import initDB from './dbconfig/db'

import express from 'express';
import cors from 'cors';

const initServer = (port: number) => {
  const server = express();

  // enable cors for local
  server.use(cors());

  server.get('/user/login', LoginHandler);
  server.post('/user/create', CreateUserHandler);
  server.put('/user/update', UpdateUserHandler);
  server.delete('/user/delete', DeleteUserHandler);

  server.post('/pet/create', CreatePetHandler)
  server.put('/pet/update', UpdatePetHandler)
  server.delete('/pet/delete', DeletePetHandler)

  server.get('/txn/list', ListTxnByUserID)

  server.get('/bid/list', ListAllBids)
  server.get('/bid/tnx', ListTnxByOwnerID)

  return () => server.listen(port, () => { console.log(`server listening at port ${port}`); });
}

export default initServer;
