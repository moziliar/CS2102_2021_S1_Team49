// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";
import * as pet_pb from "./pet_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    login: IUsersService_ILogin;
    addUser: IUsersService_IAddUser;
    updateUser: IUsersService_IUpdateUser;
    deleteUser: IUsersService_IDeleteUser;
    listAllCareTakers: IUsersService_IListAllCareTakers;
    listAllPaychecksByCareTaker: IUsersService_IListAllPaychecksByCareTaker;
}

interface IUsersService_ILogin extends grpc.MethodDefinition<user_pb.LoginReq, user_pb.LoginResp> {
    path: "/user.Users/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.LoginReq>;
    requestDeserialize: grpc.deserialize<user_pb.LoginReq>;
    responseSerialize: grpc.serialize<user_pb.LoginResp>;
    responseDeserialize: grpc.deserialize<user_pb.LoginResp>;
}
interface IUsersService_IAddUser extends grpc.MethodDefinition<user_pb.User, user_pb.AddUserResp> {
    path: "/user.Users/AddUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.User>;
    requestDeserialize: grpc.deserialize<user_pb.User>;
    responseSerialize: grpc.serialize<user_pb.AddUserResp>;
    responseDeserialize: grpc.deserialize<user_pb.AddUserResp>;
}
interface IUsersService_IUpdateUser extends grpc.MethodDefinition<user_pb.User, user_pb.UpdateUserResp> {
    path: "/user.Users/UpdateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.User>;
    requestDeserialize: grpc.deserialize<user_pb.User>;
    responseSerialize: grpc.serialize<user_pb.UpdateUserResp>;
    responseDeserialize: grpc.deserialize<user_pb.UpdateUserResp>;
}
interface IUsersService_IDeleteUser extends grpc.MethodDefinition<user_pb.User, user_pb.DeleteUserResp> {
    path: "/user.Users/DeleteUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.User>;
    requestDeserialize: grpc.deserialize<user_pb.User>;
    responseSerialize: grpc.serialize<user_pb.DeleteUserResp>;
    responseDeserialize: grpc.deserialize<user_pb.DeleteUserResp>;
}
interface IUsersService_IListAllCareTakers extends grpc.MethodDefinition<user_pb.ListAllCareTakersReq, user_pb.ListAllCareTakersResp> {
    path: "/user.Users/ListAllCareTakers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.ListAllCareTakersReq>;
    requestDeserialize: grpc.deserialize<user_pb.ListAllCareTakersReq>;
    responseSerialize: grpc.serialize<user_pb.ListAllCareTakersResp>;
    responseDeserialize: grpc.deserialize<user_pb.ListAllCareTakersResp>;
}
interface IUsersService_IListAllPaychecksByCareTaker extends grpc.MethodDefinition<user_pb.ListAllPaychecksByCareTakerReq, user_pb.ListAllPaychecksByCareTakerResp> {
    path: "/user.Users/ListAllPaychecksByCareTaker";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.ListAllPaychecksByCareTakerReq>;
    requestDeserialize: grpc.deserialize<user_pb.ListAllPaychecksByCareTakerReq>;
    responseSerialize: grpc.serialize<user_pb.ListAllPaychecksByCareTakerResp>;
    responseDeserialize: grpc.deserialize<user_pb.ListAllPaychecksByCareTakerResp>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    login: grpc.handleUnaryCall<user_pb.LoginReq, user_pb.LoginResp>;
    addUser: grpc.handleUnaryCall<user_pb.User, user_pb.AddUserResp>;
    updateUser: grpc.handleUnaryCall<user_pb.User, user_pb.UpdateUserResp>;
    deleteUser: grpc.handleUnaryCall<user_pb.User, user_pb.DeleteUserResp>;
    listAllCareTakers: grpc.handleUnaryCall<user_pb.ListAllCareTakersReq, user_pb.ListAllCareTakersResp>;
    listAllPaychecksByCareTaker: grpc.handleUnaryCall<user_pb.ListAllPaychecksByCareTakerReq, user_pb.ListAllPaychecksByCareTakerResp>;
}

export interface IUsersClient {
    login(request: user_pb.LoginReq, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResp) => void): grpc.ClientUnaryCall;
    login(request: user_pb.LoginReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResp) => void): grpc.ClientUnaryCall;
    login(request: user_pb.LoginReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResp) => void): grpc.ClientUnaryCall;
    addUser(request: user_pb.User, callback: (error: grpc.ServiceError | null, response: user_pb.AddUserResp) => void): grpc.ClientUnaryCall;
    addUser(request: user_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AddUserResp) => void): grpc.ClientUnaryCall;
    addUser(request: user_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AddUserResp) => void): grpc.ClientUnaryCall;
    updateUser(request: user_pb.User, callback: (error: grpc.ServiceError | null, response: user_pb.UpdateUserResp) => void): grpc.ClientUnaryCall;
    updateUser(request: user_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UpdateUserResp) => void): grpc.ClientUnaryCall;
    updateUser(request: user_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UpdateUserResp) => void): grpc.ClientUnaryCall;
    deleteUser(request: user_pb.User, callback: (error: grpc.ServiceError | null, response: user_pb.DeleteUserResp) => void): grpc.ClientUnaryCall;
    deleteUser(request: user_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.DeleteUserResp) => void): grpc.ClientUnaryCall;
    deleteUser(request: user_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.DeleteUserResp) => void): grpc.ClientUnaryCall;
    listAllCareTakers(request: user_pb.ListAllCareTakersReq, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllCareTakersResp) => void): grpc.ClientUnaryCall;
    listAllCareTakers(request: user_pb.ListAllCareTakersReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllCareTakersResp) => void): grpc.ClientUnaryCall;
    listAllCareTakers(request: user_pb.ListAllCareTakersReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllCareTakersResp) => void): grpc.ClientUnaryCall;
    listAllPaychecksByCareTaker(request: user_pb.ListAllPaychecksByCareTakerReq, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllPaychecksByCareTakerResp) => void): grpc.ClientUnaryCall;
    listAllPaychecksByCareTaker(request: user_pb.ListAllPaychecksByCareTakerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllPaychecksByCareTakerResp) => void): grpc.ClientUnaryCall;
    listAllPaychecksByCareTaker(request: user_pb.ListAllPaychecksByCareTakerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllPaychecksByCareTakerResp) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public login(request: user_pb.LoginReq, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResp) => void): grpc.ClientUnaryCall;
    public login(request: user_pb.LoginReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResp) => void): grpc.ClientUnaryCall;
    public login(request: user_pb.LoginReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResp) => void): grpc.ClientUnaryCall;
    public addUser(request: user_pb.User, callback: (error: grpc.ServiceError | null, response: user_pb.AddUserResp) => void): grpc.ClientUnaryCall;
    public addUser(request: user_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AddUserResp) => void): grpc.ClientUnaryCall;
    public addUser(request: user_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AddUserResp) => void): grpc.ClientUnaryCall;
    public updateUser(request: user_pb.User, callback: (error: grpc.ServiceError | null, response: user_pb.UpdateUserResp) => void): grpc.ClientUnaryCall;
    public updateUser(request: user_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UpdateUserResp) => void): grpc.ClientUnaryCall;
    public updateUser(request: user_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UpdateUserResp) => void): grpc.ClientUnaryCall;
    public deleteUser(request: user_pb.User, callback: (error: grpc.ServiceError | null, response: user_pb.DeleteUserResp) => void): grpc.ClientUnaryCall;
    public deleteUser(request: user_pb.User, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.DeleteUserResp) => void): grpc.ClientUnaryCall;
    public deleteUser(request: user_pb.User, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.DeleteUserResp) => void): grpc.ClientUnaryCall;
    public listAllCareTakers(request: user_pb.ListAllCareTakersReq, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllCareTakersResp) => void): grpc.ClientUnaryCall;
    public listAllCareTakers(request: user_pb.ListAllCareTakersReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllCareTakersResp) => void): grpc.ClientUnaryCall;
    public listAllCareTakers(request: user_pb.ListAllCareTakersReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllCareTakersResp) => void): grpc.ClientUnaryCall;
    public listAllPaychecksByCareTaker(request: user_pb.ListAllPaychecksByCareTakerReq, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllPaychecksByCareTakerResp) => void): grpc.ClientUnaryCall;
    public listAllPaychecksByCareTaker(request: user_pb.ListAllPaychecksByCareTakerReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllPaychecksByCareTakerResp) => void): grpc.ClientUnaryCall;
    public listAllPaychecksByCareTaker(request: user_pb.ListAllPaychecksByCareTakerReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.ListAllPaychecksByCareTakerResp) => void): grpc.ClientUnaryCall;
}
