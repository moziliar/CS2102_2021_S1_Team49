// package: transaction
// file: transaction.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as transaction_pb from "./transaction_pb";
import * as user_pb from "./user_pb";
import * as pet_pb from "./pet_pb";

interface ITransactionsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listTnxByUserID: ITransactionsService_IListTnxByUserID;
}

interface ITransactionsService_IListTnxByUserID extends grpc.MethodDefinition<transaction_pb.ListTnxByUserIDReq, transaction_pb.ListTnxResp> {
    path: "/transaction.Transactions/ListTnxByUserID";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<transaction_pb.ListTnxByUserIDReq>;
    requestDeserialize: grpc.deserialize<transaction_pb.ListTnxByUserIDReq>;
    responseSerialize: grpc.serialize<transaction_pb.ListTnxResp>;
    responseDeserialize: grpc.deserialize<transaction_pb.ListTnxResp>;
}

export const TransactionsService: ITransactionsService;

export interface ITransactionsServer {
    listTnxByUserID: grpc.handleUnaryCall<transaction_pb.ListTnxByUserIDReq, transaction_pb.ListTnxResp>;
}

export interface ITransactionsClient {
    listTnxByUserID(request: transaction_pb.ListTnxByUserIDReq, callback: (error: grpc.ServiceError | null, response: transaction_pb.ListTnxResp) => void): grpc.ClientUnaryCall;
    listTnxByUserID(request: transaction_pb.ListTnxByUserIDReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: transaction_pb.ListTnxResp) => void): grpc.ClientUnaryCall;
    listTnxByUserID(request: transaction_pb.ListTnxByUserIDReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: transaction_pb.ListTnxResp) => void): grpc.ClientUnaryCall;
}

export class TransactionsClient extends grpc.Client implements ITransactionsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listTnxByUserID(request: transaction_pb.ListTnxByUserIDReq, callback: (error: grpc.ServiceError | null, response: transaction_pb.ListTnxResp) => void): grpc.ClientUnaryCall;
    public listTnxByUserID(request: transaction_pb.ListTnxByUserIDReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: transaction_pb.ListTnxResp) => void): grpc.ClientUnaryCall;
    public listTnxByUserID(request: transaction_pb.ListTnxByUserIDReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: transaction_pb.ListTnxResp) => void): grpc.ClientUnaryCall;
}
