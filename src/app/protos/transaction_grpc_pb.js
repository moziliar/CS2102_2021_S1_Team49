// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var transaction_pb = require('./transaction_pb.js');
var user_pb = require('./user_pb.js');
var pet_pb = require('./pet_pb.js');

function serialize_transaction_ListTnxByUserIDReq(arg) {
  if (!(arg instanceof transaction_pb.ListTnxByUserIDReq)) {
    throw new Error('Expected argument of type transaction.ListTnxByUserIDReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_ListTnxByUserIDReq(buffer_arg) {
  return transaction_pb.ListTnxByUserIDReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transaction_ListTnxResp(arg) {
  if (!(arg instanceof transaction_pb.ListTnxResp)) {
    throw new Error('Expected argument of type transaction.ListTnxResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transaction_ListTnxResp(buffer_arg) {
  return transaction_pb.ListTnxResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionsService = exports.TransactionsService = {
  listTnxByUserID: {
    path: '/transaction.Transactions/ListTnxByUserID',
    requestStream: false,
    responseStream: false,
    requestType: transaction_pb.ListTnxByUserIDReq,
    responseType: transaction_pb.ListTnxResp,
    requestSerialize: serialize_transaction_ListTnxByUserIDReq,
    requestDeserialize: deserialize_transaction_ListTnxByUserIDReq,
    responseSerialize: serialize_transaction_ListTnxResp,
    responseDeserialize: deserialize_transaction_ListTnxResp,
  },
};

exports.TransactionsClient = grpc.makeGenericClientConstructor(TransactionsService);
