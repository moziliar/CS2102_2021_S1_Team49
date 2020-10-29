// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var bid_pb = require('./bid_pb.js');
var transaction_pb = require('./transaction_pb.js');

function serialize_bid_AddBidResp(arg) {
  if (!(arg instanceof bid_pb.AddBidResp)) {
    throw new Error('Expected argument of type bid.AddBidResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bid_AddBidResp(buffer_arg) {
  return bid_pb.AddBidResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bid_Bid(arg) {
  if (!(arg instanceof bid_pb.Bid)) {
    throw new Error('Expected argument of type bid.Bid');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bid_Bid(buffer_arg) {
  return bid_pb.Bid.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bid_DeleteBidResp(arg) {
  if (!(arg instanceof bid_pb.DeleteBidResp)) {
    throw new Error('Expected argument of type bid.DeleteBidResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bid_DeleteBidResp(buffer_arg) {
  return bid_pb.DeleteBidResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bid_ListBidsByUserIDReq(arg) {
  if (!(arg instanceof bid_pb.ListBidsByUserIDReq)) {
    throw new Error('Expected argument of type bid.ListBidsByUserIDReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bid_ListBidsByUserIDReq(buffer_arg) {
  return bid_pb.ListBidsByUserIDReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bid_ListBidsResp(arg) {
  if (!(arg instanceof bid_pb.ListBidsResp)) {
    throw new Error('Expected argument of type bid.ListBidsResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bid_ListBidsResp(buffer_arg) {
  return bid_pb.ListBidsResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bid_UpdateBidResp(arg) {
  if (!(arg instanceof bid_pb.UpdateBidResp)) {
    throw new Error('Expected argument of type bid.UpdateBidResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bid_UpdateBidResp(buffer_arg) {
  return bid_pb.UpdateBidResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var BidsService = exports.BidsService = {
  addBid: {
    path: '/bid.Bids/AddBid',
    requestStream: false,
    responseStream: false,
    requestType: bid_pb.Bid,
    responseType: bid_pb.AddBidResp,
    requestSerialize: serialize_bid_Bid,
    requestDeserialize: deserialize_bid_Bid,
    responseSerialize: serialize_bid_AddBidResp,
    responseDeserialize: deserialize_bid_AddBidResp,
  },
  updateBid: {
    path: '/bid.Bids/UpdateBid',
    requestStream: false,
    responseStream: false,
    requestType: bid_pb.Bid,
    responseType: bid_pb.UpdateBidResp,
    requestSerialize: serialize_bid_Bid,
    requestDeserialize: deserialize_bid_Bid,
    responseSerialize: serialize_bid_UpdateBidResp,
    responseDeserialize: deserialize_bid_UpdateBidResp,
  },
  deleteBid: {
    path: '/bid.Bids/DeleteBid',
    requestStream: false,
    responseStream: false,
    requestType: bid_pb.Bid,
    responseType: bid_pb.DeleteBidResp,
    requestSerialize: serialize_bid_Bid,
    requestDeserialize: deserialize_bid_Bid,
    responseSerialize: serialize_bid_DeleteBidResp,
    responseDeserialize: deserialize_bid_DeleteBidResp,
  },
  listBidsByUserId: {
    path: '/bid.Bids/ListBidsByUserId',
    requestStream: false,
    responseStream: false,
    requestType: bid_pb.ListBidsByUserIDReq,
    responseType: bid_pb.ListBidsResp,
    requestSerialize: serialize_bid_ListBidsByUserIDReq,
    requestDeserialize: deserialize_bid_ListBidsByUserIDReq,
    responseSerialize: serialize_bid_ListBidsResp,
    responseDeserialize: deserialize_bid_ListBidsResp,
  },
};

exports.BidsClient = grpc.makeGenericClientConstructor(BidsService);
