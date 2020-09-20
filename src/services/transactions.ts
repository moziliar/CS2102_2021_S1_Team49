import { sendUnaryData, ServerUnaryCall } from "grpc";

import { ITransactionsServer, TransactionsService } from "../protos/transaction_grpc_pb"
import {
  ListTnxByOwnerIDReq, ListTnxByPetIDReq, ListTnxByTakerIDReq,
  ListTnxResp
} from "../protos/transaction_pb"

class Transactions implements ITransactionsServer {
  public listTnxByOwnerID(
    call: ServerUnaryCall<ListTnxByOwnerIDReq>,
    callback: sendUnaryData<ListTnxResp>): void {
    // TODO: implement
  };
  public listTnxByTakerID(
    call: ServerUnaryCall<ListTnxByTakerIDReq>,
    callback: sendUnaryData<ListTnxResp>): void {
    // TODO: implement
  };
  public listTnxByPetID(
    call: ServerUnaryCall<ListTnxByPetIDReq>,
    callback: sendUnaryData<ListTnxResp>): void {
    // TODO: implement
  };
}

export {
  Transactions,
  TransactionsService
}
