import {
  LoginHandler, CreateUserHandler, UpdateUserHandler, DeleteUserHandler,
  AddCreditCardHandler, DeleteCreditCardHandler,
  ApplyLeaveHanlder, ApplyAvailabilityHanlder,
  ApplyCareTakerHandler, ListCareTakerHandler, ListTopPerformingCareTaker,
  GetAllCareTakerDailyPriceHandler, DeleteDailyPriceHandler, UpdateDailyPriceHandler, CreateDailyPriceHandler, GetSalaryHandler
} from './controllers/user'
import { CreatePetHandler, UpdatePetHandler, DeletePetHandler, GetAllCategoryPricesHandler, GetAllPetCategoriesHandler, CreateCategoryHandler, UpdateCategoryHandler } from './controllers/pet'
import { CreateTransactionInfo, ListTxnByUserID, AcceptBidByParams, ReviewTransactionHandler } from './controllers/txn'
import { ListAllBids, ListBidByOwnerID } from './controllers/bid';
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
  router.post('/user/apply_leave', ApplyLeaveHanlder);
  router.post('/user/apply_availability', ApplyAvailabilityHanlder);
  router.post('/apply/caretaker', ApplyCareTakerHandler);
  router.get('/search/caretaker', ListCareTakerHandler);
  router.get('/top/caretaker', ListTopPerformingCareTaker);
  router.get('/dailyrate/caretaker', GetAllCareTakerDailyPriceHandler);
  router.post('/dailyrate/create', CreateDailyPriceHandler);
  router.put('/dailyrate/update', UpdateDailyPriceHandler);
  router.delete('/dailyrate/delete', DeleteDailyPriceHandler);
  router.get('/caretaker/salary', GetSalaryHandler);

  router.post('/card/create', AddCreditCardHandler);
  router.delete('/card/delete', DeleteCreditCardHandler);

  router.get('/categories/list', GetAllPetCategoriesHandler);
  router.get('/categories/pricelist', GetAllCategoryPricesHandler);
  router.post('/category/create', CreateCategoryHandler);
  router.put('/category/update', UpdateCategoryHandler);
  router.post('/pet/create', CreatePetHandler);
  router.put('/pet/update', UpdatePetHandler);
  router.delete('/pet/delete', DeletePetHandler);

  router.post('/txn/create', CreateTransactionInfo);
  router.get('/txn/list', ListTxnByUserID);
  router.put('/txn/addreview', ReviewTransactionHandler)

  router.get('/bid/list', ListAllBids);
  router.get('/bid/query', ListBidByOwnerID);
  router.put('/bid/accept', AcceptBidByParams);

  router.all('*', (req, res) => res.redirect('/'));

  return () => server.listen(port, () => { console.log(`server listening at port ${port}`); });
}

export default initServer;
