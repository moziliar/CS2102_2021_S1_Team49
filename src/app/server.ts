import { Server, ServerCredentials } from "grpc";

import { Users, UsersService } from "./services/users"
import { Transactions, TransactionsService } from "./services/transactions"

const localhost = '127.0.0.1';
let port = process.env.PORT;

const server: Server = new Server({
  'grpc:max_receive_message_length': 1,
  'grpc:max_send_message_length': 1,
});

server.bind(`${localhost}:${port}`, ServerCredentials.createInsecure());
server.addService(UsersService, new Users());
server.addService(TransactionsService, new Transactions());

server.start()
