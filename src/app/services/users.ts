import { sendUnaryData, ServerUnaryCall } from "grpc";

import { IUsersServer, UsersService } from "../../protos/user_grpc_pb"
import {
  User,
  LoginReq, LoginResp,
  AddUserResp, UpdateUserResp, DeleteUserResp,
  ListAllCareTakersReq, ListAllCareTakersResp,
  ListAllPaychecksByCareTakerReq, ListAllPaychecksByCareTakerResp
} from "../../protos/user_pb"

class Users implements IUsersServer {
  public login(
    call: ServerUnaryCall<LoginReq>,
    callback: sendUnaryData<LoginResp>): void {
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
  public listAllPaychecksByCareTaker(
    call: ServerUnaryCall<ListAllPaychecksByCareTakerReq>,
    callback: sendUnaryData<ListAllPaychecksByCareTakerResp>): void {
    // TODO: implement
  };
}

export {
  Users,
  UsersService
}
