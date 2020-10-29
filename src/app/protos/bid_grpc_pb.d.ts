// package: bid
// file: bid.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as bid_pb from "./bid_pb";
import * as transaction_pb from "./transaction_pb";

interface IBidsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addBid: IBidsService_IAddBid;
    updateBid: IBidsService_IUpdateBid;
    deleteBid: IBidsService_IDeleteBid;
    listBidsByUserId: IBidsService_IListBidsByUserId;
}

interface IBidsService_IAddBid extends grpc.MethodDefinition<bid_pb.Bid, bid_pb.AddBidResp> {
    path: "/bid.Bids/AddBid";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bid_pb.Bid>;
    requestDeserialize: grpc.deserialize<bid_pb.Bid>;
    responseSerialize: grpc.serialize<bid_pb.AddBidResp>;
    responseDeserialize: grpc.deserialize<bid_pb.AddBidResp>;
}
interface IBidsService_IUpdateBid extends grpc.MethodDefinition<bid_pb.Bid, bid_pb.UpdateBidResp> {
    path: "/bid.Bids/UpdateBid";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bid_pb.Bid>;
    requestDeserialize: grpc.deserialize<bid_pb.Bid>;
    responseSerialize: grpc.serialize<bid_pb.UpdateBidResp>;
    responseDeserialize: grpc.deserialize<bid_pb.UpdateBidResp>;
}
interface IBidsService_IDeleteBid extends grpc.MethodDefinition<bid_pb.Bid, bid_pb.DeleteBidResp> {
    path: "/bid.Bids/DeleteBid";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bid_pb.Bid>;
    requestDeserialize: grpc.deserialize<bid_pb.Bid>;
    responseSerialize: grpc.serialize<bid_pb.DeleteBidResp>;
    responseDeserialize: grpc.deserialize<bid_pb.DeleteBidResp>;
}
interface IBidsService_IListBidsByUserId extends grpc.MethodDefinition<bid_pb.ListBidsByUserIDReq, bid_pb.ListBidsResp> {
    path: "/bid.Bids/ListBidsByUserId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<bid_pb.ListBidsByUserIDReq>;
    requestDeserialize: grpc.deserialize<bid_pb.ListBidsByUserIDReq>;
    responseSerialize: grpc.serialize<bid_pb.ListBidsResp>;
    responseDeserialize: grpc.deserialize<bid_pb.ListBidsResp>;
}

export const BidsService: IBidsService;

export interface IBidsServer {
    addBid: grpc.handleUnaryCall<bid_pb.Bid, bid_pb.AddBidResp>;
    updateBid: grpc.handleUnaryCall<bid_pb.Bid, bid_pb.UpdateBidResp>;
    deleteBid: grpc.handleUnaryCall<bid_pb.Bid, bid_pb.DeleteBidResp>;
    listBidsByUserId: grpc.handleUnaryCall<bid_pb.ListBidsByUserIDReq, bid_pb.ListBidsResp>;
}

export interface IBidsClient {
    addBid(request: bid_pb.Bid, callback: (error: grpc.ServiceError | null, response: bid_pb.AddBidResp) => void): grpc.ClientUnaryCall;
    addBid(request: bid_pb.Bid, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.AddBidResp) => void): grpc.ClientUnaryCall;
    addBid(request: bid_pb.Bid, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.AddBidResp) => void): grpc.ClientUnaryCall;
    updateBid(request: bid_pb.Bid, callback: (error: grpc.ServiceError | null, response: bid_pb.UpdateBidResp) => void): grpc.ClientUnaryCall;
    updateBid(request: bid_pb.Bid, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.UpdateBidResp) => void): grpc.ClientUnaryCall;
    updateBid(request: bid_pb.Bid, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.UpdateBidResp) => void): grpc.ClientUnaryCall;
    deleteBid(request: bid_pb.Bid, callback: (error: grpc.ServiceError | null, response: bid_pb.DeleteBidResp) => void): grpc.ClientUnaryCall;
    deleteBid(request: bid_pb.Bid, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.DeleteBidResp) => void): grpc.ClientUnaryCall;
    deleteBid(request: bid_pb.Bid, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.DeleteBidResp) => void): grpc.ClientUnaryCall;
    listBidsByUserId(request: bid_pb.ListBidsByUserIDReq, callback: (error: grpc.ServiceError | null, response: bid_pb.ListBidsResp) => void): grpc.ClientUnaryCall;
    listBidsByUserId(request: bid_pb.ListBidsByUserIDReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.ListBidsResp) => void): grpc.ClientUnaryCall;
    listBidsByUserId(request: bid_pb.ListBidsByUserIDReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.ListBidsResp) => void): grpc.ClientUnaryCall;
}

export class BidsClient extends grpc.Client implements IBidsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addBid(request: bid_pb.Bid, callback: (error: grpc.ServiceError | null, response: bid_pb.AddBidResp) => void): grpc.ClientUnaryCall;
    public addBid(request: bid_pb.Bid, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.AddBidResp) => void): grpc.ClientUnaryCall;
    public addBid(request: bid_pb.Bid, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.AddBidResp) => void): grpc.ClientUnaryCall;
    public updateBid(request: bid_pb.Bid, callback: (error: grpc.ServiceError | null, response: bid_pb.UpdateBidResp) => void): grpc.ClientUnaryCall;
    public updateBid(request: bid_pb.Bid, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.UpdateBidResp) => void): grpc.ClientUnaryCall;
    public updateBid(request: bid_pb.Bid, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.UpdateBidResp) => void): grpc.ClientUnaryCall;
    public deleteBid(request: bid_pb.Bid, callback: (error: grpc.ServiceError | null, response: bid_pb.DeleteBidResp) => void): grpc.ClientUnaryCall;
    public deleteBid(request: bid_pb.Bid, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.DeleteBidResp) => void): grpc.ClientUnaryCall;
    public deleteBid(request: bid_pb.Bid, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.DeleteBidResp) => void): grpc.ClientUnaryCall;
    public listBidsByUserId(request: bid_pb.ListBidsByUserIDReq, callback: (error: grpc.ServiceError | null, response: bid_pb.ListBidsResp) => void): grpc.ClientUnaryCall;
    public listBidsByUserId(request: bid_pb.ListBidsByUserIDReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: bid_pb.ListBidsResp) => void): grpc.ClientUnaryCall;
    public listBidsByUserId(request: bid_pb.ListBidsByUserIDReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: bid_pb.ListBidsResp) => void): grpc.ClientUnaryCall;
}
