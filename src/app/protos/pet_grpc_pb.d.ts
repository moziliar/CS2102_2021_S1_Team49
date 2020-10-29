// package: pet
// file: pet.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as pet_pb from "./pet_pb";

interface IPetsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addPet: IPetsService_IAddPet;
    updatePet: IPetsService_IUpdatePet;
    deletePet: IPetsService_IDeletePet;
}

interface IPetsService_IAddPet extends grpc.MethodDefinition<pet_pb.Pet, pet_pb.AddPetResp> {
    path: "/pet.Pets/AddPet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<pet_pb.Pet>;
    requestDeserialize: grpc.deserialize<pet_pb.Pet>;
    responseSerialize: grpc.serialize<pet_pb.AddPetResp>;
    responseDeserialize: grpc.deserialize<pet_pb.AddPetResp>;
}
interface IPetsService_IUpdatePet extends grpc.MethodDefinition<pet_pb.Pet, pet_pb.UpdatePetResp> {
    path: "/pet.Pets/UpdatePet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<pet_pb.Pet>;
    requestDeserialize: grpc.deserialize<pet_pb.Pet>;
    responseSerialize: grpc.serialize<pet_pb.UpdatePetResp>;
    responseDeserialize: grpc.deserialize<pet_pb.UpdatePetResp>;
}
interface IPetsService_IDeletePet extends grpc.MethodDefinition<pet_pb.Pet, pet_pb.DeletePetResp> {
    path: "/pet.Pets/DeletePet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<pet_pb.Pet>;
    requestDeserialize: grpc.deserialize<pet_pb.Pet>;
    responseSerialize: grpc.serialize<pet_pb.DeletePetResp>;
    responseDeserialize: grpc.deserialize<pet_pb.DeletePetResp>;
}

export const PetsService: IPetsService;

export interface IPetsServer {
    addPet: grpc.handleUnaryCall<pet_pb.Pet, pet_pb.AddPetResp>;
    updatePet: grpc.handleUnaryCall<pet_pb.Pet, pet_pb.UpdatePetResp>;
    deletePet: grpc.handleUnaryCall<pet_pb.Pet, pet_pb.DeletePetResp>;
}

export interface IPetsClient {
    addPet(request: pet_pb.Pet, callback: (error: grpc.ServiceError | null, response: pet_pb.AddPetResp) => void): grpc.ClientUnaryCall;
    addPet(request: pet_pb.Pet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pet_pb.AddPetResp) => void): grpc.ClientUnaryCall;
    addPet(request: pet_pb.Pet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pet_pb.AddPetResp) => void): grpc.ClientUnaryCall;
    updatePet(request: pet_pb.Pet, callback: (error: grpc.ServiceError | null, response: pet_pb.UpdatePetResp) => void): grpc.ClientUnaryCall;
    updatePet(request: pet_pb.Pet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pet_pb.UpdatePetResp) => void): grpc.ClientUnaryCall;
    updatePet(request: pet_pb.Pet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pet_pb.UpdatePetResp) => void): grpc.ClientUnaryCall;
    deletePet(request: pet_pb.Pet, callback: (error: grpc.ServiceError | null, response: pet_pb.DeletePetResp) => void): grpc.ClientUnaryCall;
    deletePet(request: pet_pb.Pet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pet_pb.DeletePetResp) => void): grpc.ClientUnaryCall;
    deletePet(request: pet_pb.Pet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pet_pb.DeletePetResp) => void): grpc.ClientUnaryCall;
}

export class PetsClient extends grpc.Client implements IPetsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addPet(request: pet_pb.Pet, callback: (error: grpc.ServiceError | null, response: pet_pb.AddPetResp) => void): grpc.ClientUnaryCall;
    public addPet(request: pet_pb.Pet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pet_pb.AddPetResp) => void): grpc.ClientUnaryCall;
    public addPet(request: pet_pb.Pet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pet_pb.AddPetResp) => void): grpc.ClientUnaryCall;
    public updatePet(request: pet_pb.Pet, callback: (error: grpc.ServiceError | null, response: pet_pb.UpdatePetResp) => void): grpc.ClientUnaryCall;
    public updatePet(request: pet_pb.Pet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pet_pb.UpdatePetResp) => void): grpc.ClientUnaryCall;
    public updatePet(request: pet_pb.Pet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pet_pb.UpdatePetResp) => void): grpc.ClientUnaryCall;
    public deletePet(request: pet_pb.Pet, callback: (error: grpc.ServiceError | null, response: pet_pb.DeletePetResp) => void): grpc.ClientUnaryCall;
    public deletePet(request: pet_pb.Pet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pet_pb.DeletePetResp) => void): grpc.ClientUnaryCall;
    public deletePet(request: pet_pb.Pet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pet_pb.DeletePetResp) => void): grpc.ClientUnaryCall;
}
