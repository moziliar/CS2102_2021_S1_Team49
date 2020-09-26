import { sendUnaryData, ServerUnaryCall } from "grpc";

import { IUsersServer, UsersService } from "../../protos/user_grpc_pb"
import {
  User,
  LoginReq, LoginResp,
  AddUserResp, UpdateUserResp, DeleteUserResp,
  ListAllCareTakersReq, ListAllCareTakersResp,
  ListAllPaychecksByCareTakerReq, ListAllPaychecksByCareTakerResp
} from "../../protos/user_pb"
import { mockUserMsgs } from '../models/mockUsers'

class Users implements IUsersServer {
  public login(
    call: ServerUnaryCall<LoginReq>,
    callback: sendUnaryData<LoginResp>): void {
    let email = call.request.getEmail();
    let password = call.request.getPassword();

    // verify login

    let resp = new LoginResp();
    resp.setSuccess(true);
    resp.setMessage("login successful");
    resp.setUser(mockUserMsgs[0]);

    callback(null, resp);
  };
  public addUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<AddUserResp>): void {
    let newUser: User = call.request;

    // TODO: add to DB layer

    let resp = new AddUserResp();
    resp.setSuccess(true);
    resp.setMessage("add user");
    resp.setUser(newUser);

    callback(null, resp);
  };
  public updateUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<UpdateUserResp>): void {
    let newUser: User = call.request;

    // TODO: update user in DB layer and return

    let resp = new AddUserResp();
    resp.setSuccess(true);
    resp.setMessage("update user");
    resp.setUser(newUser);

    callback(null, resp);
  };
  public deleteUser(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<DeleteUserResp>): void {
    let newUser: User = call.request;

    // TODO: delete user in DB layer and return

    let resp = new AddUserResp();
    resp.setSuccess(true);
    resp.setMessage("delete user");
    resp.setUser(newUser);

    callback(null, resp);
  };
  public listAllCareTakers(
    call: ServerUnaryCall<ListAllCareTakersReq>,
    callback: sendUnaryData<ListAllCareTakersResp>): void {
    let resp = new ListAllCareTakersResp();
    resp.setCareTakersList(mockUserMsgs);

    callback(null, resp);
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
