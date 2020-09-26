import { sendUnaryData, ServerUnaryCall } from "grpc";

import { ITransactionsServer, TransactionsService } from "../../protos/transaction_grpc_pb"
import {
  Transaction,
  ListTnxByUserIDReq,
  ListTnxResp
} from "../../protos/transaction_pb"
import { mockTxnMsgs } from '../models/mockTxns'

class Transactions implements ITransactionsServer {
  public listTnxByUserID(
    call: ServerUnaryCall<ListTnxByUserIDReq>,
    callback: sendUnaryData<ListTnxResp>): void {
    let userID: number = call.request.getOwnerId();

    // TODO: get all transactions from the database by the user id

    let resp = new ListTnxResp();
    mockTxnMsgs.forEach((t: Transaction) => resp.addTransactions(t));

    callback(null, resp);
  };
}

export {
  Transactions,
  TransactionsService
}
