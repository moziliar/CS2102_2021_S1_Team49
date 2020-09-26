import { Server, ServerCredentials,  } from 'grpc';

import { Users, UsersService } from './services/users'
import { Transactions, TransactionsService } from './services/transactions'
import { Pets, PetsService } from './services/pets';
import initDB from './dbconfig/db'

const initServer = (port: number) => {
  const server: Server = new Server({
    'grpc:max_receive_message_length': 1,
    'grpc:max_send_message_length': 1,
  });

  server.addService(UsersService, new Users());
  server.addService(TransactionsService, new Transactions());
  server.addService(PetsService, new Pets());
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure());

  initDB().connect((err, client, done) => {
    if (err) throw err;
    console.log('db connected');
  })

  return server;
}

export default initServer;
