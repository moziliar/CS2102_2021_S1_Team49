import { sendUnaryData, ServerUnaryCall } from "grpc";

import { IPetsServer, PetsService } from "../protos/pet_grpc_pb"
import {
  Pet,
  AddPetResp, UpdatePetResp, DeletePetResp,
} from "../protos/pet_pb"

class Pets implements IPetsServer {
  public addPet(
    call: ServerUnaryCall<Pet>,
    callback: sendUnaryData<AddPetResp>): void {
    let pet: Pet = call.request;

    // TODO: add pet to DB and return

    let resp = new AddPetResp();
    resp.setSuccess(true);
    resp.setMessage('add pet')
    resp.setPet(pet);

    callback(null, resp);
  };
  public updatePet(
    call: ServerUnaryCall<Pet>,
    callback: sendUnaryData<UpdatePetResp>): void {
    let pet: Pet = call.request;

    // TODO: update pet in DB and return

    let resp = new AddPetResp();
    resp.setSuccess(true);
    resp.setMessage('update pet')
    resp.setPet(pet);

    callback(null, resp);
  };
  public deletePet(
    call: ServerUnaryCall<Pet>,
    callback: sendUnaryData<DeletePetResp>): void {
    let pet: Pet = call.request;

    // TODO: delete pet in DB and return

    let resp = new AddPetResp();
    resp.setSuccess(true);
    resp.setMessage('delete pet')
    resp.setPet(pet);

    callback(null, resp);
  };
}

export {
  Pets,
  PetsService
}
