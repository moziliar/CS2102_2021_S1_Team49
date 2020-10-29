/**
 * @fileoverview gRPC-Web generated client stub for transaction
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var user_pb = require('./user_pb.js')

var pet_pb = require('./pet_pb.js')
const proto = {};
proto.transaction = require('./transaction_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.transaction.TransactionsClient =
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
proto.transaction.TransactionsPromiseClient =
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
 *   !proto.transaction.ListTnxByUserIDReq,
 *   !proto.transaction.ListTnxResp>}
 */
const methodDescriptor_Transactions_ListTnxByUserID = new grpc.web.MethodDescriptor(
  '/transaction.Transactions/ListTnxByUserID',
  grpc.web.MethodType.UNARY,
  proto.transaction.ListTnxByUserIDReq,
  proto.transaction.ListTnxResp,
  /**
   * @param {!proto.transaction.ListTnxByUserIDReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.transaction.ListTnxResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.transaction.ListTnxByUserIDReq,
 *   !proto.transaction.ListTnxResp>}
 */
const methodInfo_Transactions_ListTnxByUserID = new grpc.web.AbstractClientBase.MethodInfo(
  proto.transaction.ListTnxResp,
  /**
   * @param {!proto.transaction.ListTnxByUserIDReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.transaction.ListTnxResp.deserializeBinary
);


/**
 * @param {!proto.transaction.ListTnxByUserIDReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.transaction.ListTnxResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.transaction.ListTnxResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.transaction.TransactionsClient.prototype.listTnxByUserID =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/transaction.Transactions/ListTnxByUserID',
      request,
      metadata || {},
      methodDescriptor_Transactions_ListTnxByUserID,
      callback);
};


/**
 * @param {!proto.transaction.ListTnxByUserIDReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.transaction.ListTnxResp>}
 *     A native promise that resolves to the response
 */
proto.transaction.TransactionsPromiseClient.prototype.listTnxByUserID =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/transaction.Transactions/ListTnxByUserID',
      request,
      metadata || {},
      methodDescriptor_Transactions_ListTnxByUserID);
};


module.exports = proto.transaction;

