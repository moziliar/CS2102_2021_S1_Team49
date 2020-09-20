import { sendUnaryData, ServerUnaryCall } from "grpc";

import { IUsersServer, UsersService } from "../protos/user_grpc_pb"
import {
  User, UserReq,
  AddUserResp, UpdateUserResp, DeleteUserResp,
  ListAllCareTakersReq, ListAllCareTakersResp,
  ListAllPetOwnersReq, ListAllPetOwnersResp
} from "../protos/user_pb"

class Users implements IUsersServer {
  public getUser(
    call: ServerUnaryCall<UserReq>,
    callback: sendUnaryData<User>): void {
    // TODO: implement
  };
  public addUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<AddUserResp>): void {
    // TODO: implement
  };
  public updateUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<UpdateUserResp>): void {
    // TODO: implement
  };
  public deleteUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<DeleteUserResp>): void {
    // TODO: implement
  };
  public listAllCareTakers(
    call: ServerUnaryCall<ListAllCareTakersReq>,
    callback: sendUnaryData<ListAllCareTakersResp>): void {
    // TODO: implement
  };
  public listAllPetOwners(
    call: ServerUnaryCall<ListAllPetOwnersReq>,
    callback: sendUnaryData<ListAllPetOwnersResp>): void {
    // TODO: implement
  };
}

export {
  Users,
  UsersService
}
