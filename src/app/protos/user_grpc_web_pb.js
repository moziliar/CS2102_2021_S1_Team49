/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var pet_pb = require('./pet_pb.js')
const proto = {};
proto.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UsersClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UsersPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.LoginReq,
 *   !proto.user.LoginResp>}
 */
const methodDescriptor_Users_Login = new grpc.web.MethodDescriptor(
  '/user.Users/Login',
  grpc.web.MethodType.UNARY,
  proto.user.LoginReq,
  proto.user.LoginResp,
  /**
   * @param {!proto.user.LoginReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LoginResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.LoginReq,
 *   !proto.user.LoginResp>}
 */
const methodInfo_Users_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.LoginResp,
  /**
   * @param {!proto.user.LoginReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LoginResp.deserializeBinary
);


/**
 * @param {!proto.user.LoginReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.LoginResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.LoginResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UsersClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Users/Login',
      request,
      metadata || {},
      methodDescriptor_Users_Login,
      callback);
};


/**
 * @param {!proto.user.LoginReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.LoginResp>}
 *     A native promise that resolves to the response
 */
proto.user.UsersPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Users/Login',
      request,
      metadata || {},
      methodDescriptor_Users_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.User,
 *   !proto.user.AddUserResp>}
 */
const methodDescriptor_Users_AddUser = new grpc.web.MethodDescriptor(
  '/user.Users/AddUser',
  grpc.web.MethodType.UNARY,
  proto.user.User,
  proto.user.AddUserResp,
  /**
   * @param {!proto.user.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.AddUserResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.User,
 *   !proto.user.AddUserResp>}
 */
const methodInfo_Users_AddUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.AddUserResp,
  /**
   * @param {!proto.user.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.AddUserResp.deserializeBinary
);


/**
 * @param {!proto.user.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.AddUserResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.AddUserResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UsersClient.prototype.addUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Users/AddUser',
      request,
      metadata || {},
      methodDescriptor_Users_AddUser,
      callback);
};


/**
 * @param {!proto.user.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.AddUserResp>}
 *     A native promise that resolves to the response
 */
proto.user.UsersPromiseClient.prototype.addUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Users/AddUser',
      request,
      metadata || {},
      methodDescriptor_Users_AddUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.User,
 *   !proto.user.UpdateUserResp>}
 */
const methodDescriptor_Users_UpdateUser = new grpc.web.MethodDescriptor(
  '/user.Users/UpdateUser',
  grpc.web.MethodType.UNARY,
  proto.user.User,
  proto.user.UpdateUserResp,
  /**
   * @param {!proto.user.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.UpdateUserResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.User,
 *   !proto.user.UpdateUserResp>}
 */
const methodInfo_Users_UpdateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.UpdateUserResp,
  /**
   * @param {!proto.user.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.UpdateUserResp.deserializeBinary
);


/**
 * @param {!proto.user.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.UpdateUserResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.UpdateUserResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UsersClient.prototype.updateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Users/UpdateUser',
      request,
      metadata || {},
      methodDescriptor_Users_UpdateUser,
      callback);
};


/**
 * @param {!proto.user.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.UpdateUserResp>}
 *     A native promise that resolves to the response
 */
proto.user.UsersPromiseClient.prototype.updateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Users/UpdateUser',
      request,
      metadata || {},
      methodDescriptor_Users_UpdateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.User,
 *   !proto.user.DeleteUserResp>}
 */
const methodDescriptor_Users_DeleteUser = new grpc.web.MethodDescriptor(
  '/user.Users/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.user.User,
  proto.user.DeleteUserResp,
  /**
   * @param {!proto.user.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.DeleteUserResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.User,
 *   !proto.user.DeleteUserResp>}
 */
const methodInfo_Users_DeleteUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.DeleteUserResp,
  /**
   * @param {!proto.user.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.DeleteUserResp.deserializeBinary
);


/**
 * @param {!proto.user.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.DeleteUserResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.DeleteUserResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UsersClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Users/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_Users_DeleteUser,
      callback);
};


/**
 * @param {!proto.user.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.DeleteUserResp>}
 *     A native promise that resolves to the response
 */
proto.user.UsersPromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Users/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_Users_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ListAllCareTakersReq,
 *   !proto.user.ListAllCareTakersResp>}
 */
const methodDescriptor_Users_ListAllCareTakers = new grpc.web.MethodDescriptor(
  '/user.Users/ListAllCareTakers',
  grpc.web.MethodType.UNARY,
  proto.user.ListAllCareTakersReq,
  proto.user.ListAllCareTakersResp,
  /**
   * @param {!proto.user.ListAllCareTakersReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ListAllCareTakersResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.ListAllCareTakersReq,
 *   !proto.user.ListAllCareTakersResp>}
 */
const methodInfo_Users_ListAllCareTakers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.ListAllCareTakersResp,
  /**
   * @param {!proto.user.ListAllCareTakersReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ListAllCareTakersResp.deserializeBinary
);


/**
 * @param {!proto.user.ListAllCareTakersReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.ListAllCareTakersResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ListAllCareTakersResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UsersClient.prototype.listAllCareTakers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Users/ListAllCareTakers',
      request,
      metadata || {},
      methodDescriptor_Users_ListAllCareTakers,
      callback);
};


/**
 * @param {!proto.user.ListAllCareTakersReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ListAllCareTakersResp>}
 *     A native promise that resolves to the response
 */
proto.user.UsersPromiseClient.prototype.listAllCareTakers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Users/ListAllCareTakers',
      request,
      metadata || {},
      methodDescriptor_Users_ListAllCareTakers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ListAllPaychecksByCareTakerReq,
 *   !proto.user.ListAllPaychecksByCareTakerResp>}
 */
const methodDescriptor_Users_ListAllPaychecksByCareTaker = new grpc.web.MethodDescriptor(
  '/user.Users/ListAllPaychecksByCareTaker',
  grpc.web.MethodType.UNARY,
  proto.user.ListAllPaychecksByCareTakerReq,
  proto.user.ListAllPaychecksByCareTakerResp,
  /**
   * @param {!proto.user.ListAllPaychecksByCareTakerReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ListAllPaychecksByCareTakerResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.ListAllPaychecksByCareTakerReq,
 *   !proto.user.ListAllPaychecksByCareTakerResp>}
 */
const methodInfo_Users_ListAllPaychecksByCareTaker = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.ListAllPaychecksByCareTakerResp,
  /**
   * @param {!proto.user.ListAllPaychecksByCareTakerReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ListAllPaychecksByCareTakerResp.deserializeBinary
);


/**
 * @param {!proto.user.ListAllPaychecksByCareTakerReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.ListAllPaychecksByCareTakerResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ListAllPaychecksByCareTakerResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UsersClient.prototype.listAllPaychecksByCareTaker =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.Users/ListAllPaychecksByCareTaker',
      request,
      metadata || {},
      methodDescriptor_Users_ListAllPaychecksByCareTaker,
      callback);
};


/**
 * @param {!proto.user.ListAllPaychecksByCareTakerReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ListAllPaychecksByCareTakerResp>}
 *     A native promise that resolves to the response
 */
proto.user.UsersPromiseClient.prototype.listAllPaychecksByCareTaker =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.Users/ListAllPaychecksByCareTaker',
      request,
      metadata || {},
      methodDescriptor_Users_ListAllPaychecksByCareTaker);
};


module.exports = proto.user;

