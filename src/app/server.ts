import { LoginHandler, CreateUserHandler, UpdateUserHandler, DeleteUserHandler, AddCreditCardHandler, DeleteCreditCardHandler, ApplyCareTakerHandler } from './controllers/user'
import { CreatePetHandler, UpdatePetHandler, DeletePetHandler, GetAllPetCategories } from './controllers/pet'
import { ListTxnByUserID } from './controllers/txn'
import { ListAllBids, ListTnxByOwnerID } from './controllers/bid';
import initDB from './dbconfig/db'

import express from 'express';
import Router from 'express-promise-router';
import bodyParser from 'body-parser';
import cors from 'cors';

const initServer = (port: number) => {
  const server = express();
  const router = Router();

  // enable cors for local
  server.use(cors());
  server.use(express.static('build'));
  server.use(bodyParser.json());
  server.use(router);

  router.post('/user/login', LoginHandler);
  router.post('/user/create', CreateUserHandler);
  router.put('/user/update', UpdateUserHandler);
  router.delete('/user/delete', DeleteUserHandler);
  router.post('/apply/caretaker', ApplyCareTakerHandler);

  router.post('/card/create', AddCreditCardHandler);
  router.delete('/card/delete', DeleteCreditCardHandler);

  router.get('/categories/list', GetAllPetCategories);
  router.post('/pet/create', CreatePetHandler)
  router.put('/pet/update', UpdatePetHandler)
  router.delete('/pet/delete', DeletePetHandler)

  router.get('/txn/list', ListTxnByUserID)

  router.get('/bid/list', ListAllBids)
  router.get('/bid/tnx', ListTnxByOwnerID)

  return () => server.listen(port, () => { console.log(`server listening at port ${port}`); });
}

export default initServer;
