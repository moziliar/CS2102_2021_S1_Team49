/**
 * @fileoverview gRPC-Web generated client stub for pet
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.pet = require('./pet_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pet.PetsClient =
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
proto.pet.PetsPromiseClient =
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
 *   !proto.pet.Pet,
 *   !proto.pet.AddPetResp>}
 */
const methodDescriptor_Pets_AddPet = new grpc.web.MethodDescriptor(
  '/pet.Pets/AddPet',
  grpc.web.MethodType.UNARY,
  proto.pet.Pet,
  proto.pet.AddPetResp,
  /**
   * @param {!proto.pet.Pet} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pet.AddPetResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pet.Pet,
 *   !proto.pet.AddPetResp>}
 */
const methodInfo_Pets_AddPet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pet.AddPetResp,
  /**
   * @param {!proto.pet.Pet} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pet.AddPetResp.deserializeBinary
);


/**
 * @param {!proto.pet.Pet} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pet.AddPetResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pet.AddPetResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pet.PetsClient.prototype.addPet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pet.Pets/AddPet',
      request,
      metadata || {},
      methodDescriptor_Pets_AddPet,
      callback);
};


/**
 * @param {!proto.pet.Pet} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pet.AddPetResp>}
 *     A native promise that resolves to the response
 */
proto.pet.PetsPromiseClient.prototype.addPet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pet.Pets/AddPet',
      request,
      metadata || {},
      methodDescriptor_Pets_AddPet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.pet.Pet,
 *   !proto.pet.UpdatePetResp>}
 */
const methodDescriptor_Pets_UpdatePet = new grpc.web.MethodDescriptor(
  '/pet.Pets/UpdatePet',
  grpc.web.MethodType.UNARY,
  proto.pet.Pet,
  proto.pet.UpdatePetResp,
  /**
   * @param {!proto.pet.Pet} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pet.UpdatePetResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pet.Pet,
 *   !proto.pet.UpdatePetResp>}
 */
const methodInfo_Pets_UpdatePet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pet.UpdatePetResp,
  /**
   * @param {!proto.pet.Pet} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pet.UpdatePetResp.deserializeBinary
);


/**
 * @param {!proto.pet.Pet} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pet.UpdatePetResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pet.UpdatePetResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pet.PetsClient.prototype.updatePet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pet.Pets/UpdatePet',
      request,
      metadata || {},
      methodDescriptor_Pets_UpdatePet,
      callback);
};


/**
 * @param {!proto.pet.Pet} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pet.UpdatePetResp>}
 *     A native promise that resolves to the response
 */
proto.pet.PetsPromiseClient.prototype.updatePet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pet.Pets/UpdatePet',
      request,
      metadata || {},
      methodDescriptor_Pets_UpdatePet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.pet.Pet,
 *   !proto.pet.DeletePetResp>}
 */
const methodDescriptor_Pets_DeletePet = new grpc.web.MethodDescriptor(
  '/pet.Pets/DeletePet',
  grpc.web.MethodType.UNARY,
  proto.pet.Pet,
  proto.pet.DeletePetResp,
  /**
   * @param {!proto.pet.Pet} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pet.DeletePetResp.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pet.Pet,
 *   !proto.pet.DeletePetResp>}
 */
const methodInfo_Pets_DeletePet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pet.DeletePetResp,
  /**
   * @param {!proto.pet.Pet} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pet.DeletePetResp.deserializeBinary
);


/**
 * @param {!proto.pet.Pet} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pet.DeletePetResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pet.DeletePetResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pet.PetsClient.prototype.deletePet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pet.Pets/DeletePet',
      request,
      metadata || {},
      methodDescriptor_Pets_DeletePet,
      callback);
};


/**
 * @param {!proto.pet.Pet} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pet.DeletePetResp>}
 *     A native promise that resolves to the response
 */
proto.pet.PetsPromiseClient.prototype.deletePet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pet.Pets/DeletePet',
      request,
      metadata || {},
      methodDescriptor_Pets_DeletePet);
};


module.exports = proto.pet;

