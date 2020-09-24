import { Server, ServerCredentials } from 'grpc';

import { Users, UsersService } from './services/users'
import { Transactions, TransactionsService } from './services/transactions'
import pool from './dbconfig/db'

const initServer = (port: number) => {
  const server: Server = new Server({
    'grpc:max_receive_message_length': 1,
    'grpc:max_send_message_length': 1,
  });

  server.bind(`${port}`, ServerCredentials.createInsecure());
  server.addService(UsersService, new Users());
  server.addService(TransactionsService, new Transactions());

  pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('db connected');
  })

  return server;
}

export default initServer;
