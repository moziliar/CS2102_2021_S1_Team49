import { sendUnaryData, ServerUnaryCall } from "grpc";

import { IPetsServer, PetsService } from "../protos/pet_grpc_pb"
import {
  Pet,
  AddPetResp, UpdatePetResp, DeletePetResp,
  ListAllPetsReq, ListPetsByCatReq, ListPetsByUserReq,
  ListPetsResp, ListPetsByUserResp
} from "../protos/pet_pb"

class Pets implements IPetsServer {
  public addPet(
    call: ServerUnaryCall<Pet>,
    callback: sendUnaryData<AddPetResp>): void {
    // TODO: implement
  };
  public updatePet(
    call: ServerUnaryCall<Pet>,
    callback: sendUnaryData<UpdatePetResp>): void {
    // TODO: implement
  };
  public deletePet(
    call: ServerUnaryCall<Pet>,
    callback: sendUnaryData<DeletePetResp>): void {
    // TODO: implement
  };
  public listAllPets(
    call: ServerUnaryCall<ListAllPetsReq>,
    callback: sendUnaryData<ListPetsResp>): void {
    // TODO: implement
  };
  public listPetsByUserID(
    call: ServerUnaryCall<ListPetsByUserReq>,
    callback: sendUnaryData<ListPetsByUserResp>): void {
    // TODO: implement
  };
  public listPetsByCategory(
    call: ServerUnaryCall<ListPetsByCatReq>,
    callback: sendUnaryData<ListPetsResp>): void {
    // TODO: implement
  };
}

export {
  Pets,
  PetsService
}
