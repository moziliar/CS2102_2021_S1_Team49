/**
 * @fileoverview gRPC-Web generated client stub for bid
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var transaction_pb = require('./transaction_pb.js')
const proto = {};
proto.bid = require('./bid_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.bid.BidsClient =
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
proto.bid.BidsPromiseClient =
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
 *   !proto.bid.Bid,
 *   !proto.bid.AddBidResp>}
 */
const methodDescriptor_Bids_AddBid = new grpc.web.MethodDescriptor(
  '/bid.Bids/AddBid',
  grpc.web.MethodType.UNARY,
  proto.bid.Bid,
  proto.bid.AddBidResp,
  /**
   * @param {!proto.bid.Bid} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.AddBidResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bid.Bid,
 *   !proto.bid.AddBidResp>}
 */
const methodInfo_Bids_AddBid = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bid.AddBidResp,
  /**
   * @param {!proto.bid.Bid} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.AddBidResp.deserializeBinary
);


/**
 * @param {!proto.bid.Bid} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bid.AddBidResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bid.AddBidResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bid.BidsClient.prototype.addBid =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bid.Bids/AddBid',
      request,
      metadata || {},
      methodDescriptor_Bids_AddBid,
      callback);
};


/**
 * @param {!proto.bid.Bid} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bid.AddBidResp>}
 *     A native promise that resolves to the response
 */
proto.bid.BidsPromiseClient.prototype.addBid =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bid.Bids/AddBid',
      request,
      metadata || {},
      methodDescriptor_Bids_AddBid);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bid.Bid,
 *   !proto.bid.UpdateBidResp>}
 */
const methodDescriptor_Bids_UpdateBid = new grpc.web.MethodDescriptor(
  '/bid.Bids/UpdateBid',
  grpc.web.MethodType.UNARY,
  proto.bid.Bid,
  proto.bid.UpdateBidResp,
  /**
   * @param {!proto.bid.Bid} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.UpdateBidResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bid.Bid,
 *   !proto.bid.UpdateBidResp>}
 */
const methodInfo_Bids_UpdateBid = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bid.UpdateBidResp,
  /**
   * @param {!proto.bid.Bid} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.UpdateBidResp.deserializeBinary
);


/**
 * @param {!proto.bid.Bid} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bid.UpdateBidResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bid.UpdateBidResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bid.BidsClient.prototype.updateBid =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bid.Bids/UpdateBid',
      request,
      metadata || {},
      methodDescriptor_Bids_UpdateBid,
      callback);
};


/**
 * @param {!proto.bid.Bid} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bid.UpdateBidResp>}
 *     A native promise that resolves to the response
 */
proto.bid.BidsPromiseClient.prototype.updateBid =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bid.Bids/UpdateBid',
      request,
      metadata || {},
      methodDescriptor_Bids_UpdateBid);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bid.Bid,
 *   !proto.bid.DeleteBidResp>}
 */
const methodDescriptor_Bids_DeleteBid = new grpc.web.MethodDescriptor(
  '/bid.Bids/DeleteBid',
  grpc.web.MethodType.UNARY,
  proto.bid.Bid,
  proto.bid.DeleteBidResp,
  /**
   * @param {!proto.bid.Bid} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.DeleteBidResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bid.Bid,
 *   !proto.bid.DeleteBidResp>}
 */
const methodInfo_Bids_DeleteBid = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bid.DeleteBidResp,
  /**
   * @param {!proto.bid.Bid} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.DeleteBidResp.deserializeBinary
);


/**
 * @param {!proto.bid.Bid} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bid.DeleteBidResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bid.DeleteBidResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bid.BidsClient.prototype.deleteBid =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bid.Bids/DeleteBid',
      request,
      metadata || {},
      methodDescriptor_Bids_DeleteBid,
      callback);
};


/**
 * @param {!proto.bid.Bid} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bid.DeleteBidResp>}
 *     A native promise that resolves to the response
 */
proto.bid.BidsPromiseClient.prototype.deleteBid =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bid.Bids/DeleteBid',
      request,
      metadata || {},
      methodDescriptor_Bids_DeleteBid);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.bid.ListBidsByUserIDReq,
 *   !proto.bid.ListBidsResp>}
 */
const methodDescriptor_Bids_ListBidsByUserId = new grpc.web.MethodDescriptor(
  '/bid.Bids/ListBidsByUserId',
  grpc.web.MethodType.UNARY,
  proto.bid.ListBidsByUserIDReq,
  proto.bid.ListBidsResp,
  /**
   * @param {!proto.bid.ListBidsByUserIDReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.ListBidsResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.bid.ListBidsByUserIDReq,
 *   !proto.bid.ListBidsResp>}
 */
const methodInfo_Bids_ListBidsByUserId = new grpc.web.AbstractClientBase.MethodInfo(
  proto.bid.ListBidsResp,
  /**
   * @param {!proto.bid.ListBidsByUserIDReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.bid.ListBidsResp.deserializeBinary
);


/**
 * @param {!proto.bid.ListBidsByUserIDReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.bid.ListBidsResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.bid.ListBidsResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.bid.BidsClient.prototype.listBidsByUserId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/bid.Bids/ListBidsByUserId',
      request,
      metadata || {},
      methodDescriptor_Bids_ListBidsByUserId,
      callback);
};


/**
 * @param {!proto.bid.ListBidsByUserIDReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.bid.ListBidsResp>}
 *     A native promise that resolves to the response
 */
proto.bid.BidsPromiseClient.prototype.listBidsByUserId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/bid.Bids/ListBidsByUserId',
      request,
      metadata || {},
      methodDescriptor_Bids_ListBidsByUserId);
};


module.exports = proto.bid;

