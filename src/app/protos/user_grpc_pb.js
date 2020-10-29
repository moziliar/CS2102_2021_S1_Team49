// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');
var pet_pb = require('./pet_pb.js');

function serialize_user_AddUserResp(arg) {
  if (!(arg instanceof user_pb.AddUserResp)) {
    throw new Error('Expected argument of type user.AddUserResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_AddUserResp(buffer_arg) {
  return user_pb.AddUserResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteUserResp(arg) {
  if (!(arg instanceof user_pb.DeleteUserResp)) {
    throw new Error('Expected argument of type user.DeleteUserResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_DeleteUserResp(buffer_arg) {
  return user_pb.DeleteUserResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_ListAllCareTakersReq(arg) {
  if (!(arg instanceof user_pb.ListAllCareTakersReq)) {
    throw new Error('Expected argument of type user.ListAllCareTakersReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ListAllCareTakersReq(buffer_arg) {
  return user_pb.ListAllCareTakersReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_ListAllCareTakersResp(arg) {
  if (!(arg instanceof user_pb.ListAllCareTakersResp)) {
    throw new Error('Expected argument of type user.ListAllCareTakersResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ListAllCareTakersResp(buffer_arg) {
  return user_pb.ListAllCareTakersResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_ListAllPaychecksByCareTakerReq(arg) {
  if (!(arg instanceof user_pb.ListAllPaychecksByCareTakerReq)) {
    throw new Error('Expected argument of type user.ListAllPaychecksByCareTakerReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ListAllPaychecksByCareTakerReq(buffer_arg) {
  return user_pb.ListAllPaychecksByCareTakerReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_ListAllPaychecksByCareTakerResp(arg) {
  if (!(arg instanceof user_pb.ListAllPaychecksByCareTakerResp)) {
    throw new Error('Expected argument of type user.ListAllPaychecksByCareTakerResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ListAllPaychecksByCareTakerResp(buffer_arg) {
  return user_pb.ListAllPaychecksByCareTakerResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginReq(arg) {
  if (!(arg instanceof user_pb.LoginReq)) {
    throw new Error('Expected argument of type user.LoginReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginReq(buffer_arg) {
  return user_pb.LoginReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginResp(arg) {
  if (!(arg instanceof user_pb.LoginResp)) {
    throw new Error('Expected argument of type user.LoginResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginResp(buffer_arg) {
  return user_pb.LoginResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UpdateUserResp(arg) {
  if (!(arg instanceof user_pb.UpdateUserResp)) {
    throw new Error('Expected argument of type user.UpdateUserResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UpdateUserResp(buffer_arg) {
  return user_pb.UpdateUserResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_User(arg) {
  if (!(arg instanceof user_pb.User)) {
    throw new Error('Expected argument of type user.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_User(buffer_arg) {
  return user_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  login: {
    path: '/user.Users/Login',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.LoginReq,
    responseType: user_pb.LoginResp,
    requestSerialize: serialize_user_LoginReq,
    requestDeserialize: deserialize_user_LoginReq,
    responseSerialize: serialize_user_LoginResp,
    responseDeserialize: deserialize_user_LoginResp,
  },
  addUser: {
    path: '/user.Users/AddUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.User,
    responseType: user_pb.AddUserResp,
    requestSerialize: serialize_user_User,
    requestDeserialize: deserialize_user_User,
    responseSerialize: serialize_user_AddUserResp,
    responseDeserialize: deserialize_user_AddUserResp,
  },
  updateUser: {
    path: '/user.Users/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.User,
    responseType: user_pb.UpdateUserResp,
    requestSerialize: serialize_user_User,
    requestDeserialize: deserialize_user_User,
    responseSerialize: serialize_user_UpdateUserResp,
    responseDeserialize: deserialize_user_UpdateUserResp,
  },
  deleteUser: {
    path: '/user.Users/DeleteUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.User,
    responseType: user_pb.DeleteUserResp,
    requestSerialize: serialize_user_User,
    requestDeserialize: deserialize_user_User,
    responseSerialize: serialize_user_DeleteUserResp,
    responseDeserialize: deserialize_user_DeleteUserResp,
  },
  listAllCareTakers: {
    path: '/user.Users/ListAllCareTakers',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.ListAllCareTakersReq,
    responseType: user_pb.ListAllCareTakersResp,
    requestSerialize: serialize_user_ListAllCareTakersReq,
    requestDeserialize: deserialize_user_ListAllCareTakersReq,
    responseSerialize: serialize_user_ListAllCareTakersResp,
    responseDeserialize: deserialize_user_ListAllCareTakersResp,
  },
  listAllPaychecksByCareTaker: {
    path: '/user.Users/ListAllPaychecksByCareTaker',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.ListAllPaychecksByCareTakerReq,
    responseType: user_pb.ListAllPaychecksByCareTakerResp,
    requestSerialize: serialize_user_ListAllPaychecksByCareTakerReq,
    requestDeserialize: deserialize_user_ListAllPaychecksByCareTakerReq,
    responseSerialize: serialize_user_ListAllPaychecksByCareTakerResp,
    responseDeserialize: deserialize_user_ListAllPaychecksByCareTakerResp,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
