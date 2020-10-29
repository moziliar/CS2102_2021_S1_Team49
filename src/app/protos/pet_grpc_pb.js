// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var pet_pb = require('./pet_pb.js');

function serialize_pet_AddPetResp(arg) {
  if (!(arg instanceof pet_pb.AddPetResp)) {
    throw new Error('Expected argument of type pet.AddPetResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pet_AddPetResp(buffer_arg) {
  return pet_pb.AddPetResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pet_DeletePetResp(arg) {
  if (!(arg instanceof pet_pb.DeletePetResp)) {
    throw new Error('Expected argument of type pet.DeletePetResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pet_DeletePetResp(buffer_arg) {
  return pet_pb.DeletePetResp.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pet_Pet(arg) {
  if (!(arg instanceof pet_pb.Pet)) {
    throw new Error('Expected argument of type pet.Pet');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pet_Pet(buffer_arg) {
  return pet_pb.Pet.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pet_UpdatePetResp(arg) {
  if (!(arg instanceof pet_pb.UpdatePetResp)) {
    throw new Error('Expected argument of type pet.UpdatePetResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pet_UpdatePetResp(buffer_arg) {
  return pet_pb.UpdatePetResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var PetsService = exports.PetsService = {
  addPet: {
    path: '/pet.Pets/AddPet',
    requestStream: false,
    responseStream: false,
    requestType: pet_pb.Pet,
    responseType: pet_pb.AddPetResp,
    requestSerialize: serialize_pet_Pet,
    requestDeserialize: deserialize_pet_Pet,
    responseSerialize: serialize_pet_AddPetResp,
    responseDeserialize: deserialize_pet_AddPetResp,
  },
  updatePet: {
    path: '/pet.Pets/UpdatePet',
    requestStream: false,
    responseStream: false,
    requestType: pet_pb.Pet,
    responseType: pet_pb.UpdatePetResp,
    requestSerialize: serialize_pet_Pet,
    requestDeserialize: deserialize_pet_Pet,
    responseSerialize: serialize_pet_UpdatePetResp,
    responseDeserialize: deserialize_pet_UpdatePetResp,
  },
  deletePet: {
    path: '/pet.Pets/DeletePet',
    requestStream: false,
    responseStream: false,
    requestType: pet_pb.Pet,
    responseType: pet_pb.DeletePetResp,
    requestSerialize: serialize_pet_Pet,
    requestDeserialize: deserialize_pet_Pet,
    responseSerialize: serialize_pet_DeletePetResp,
    responseDeserialize: deserialize_pet_DeletePetResp,
  },
};

exports.PetsClient = grpc.makeGenericClientConstructor(PetsService);
