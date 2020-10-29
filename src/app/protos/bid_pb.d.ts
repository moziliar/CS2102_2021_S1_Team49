// package: bid
// file: bid.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as transaction_pb from "./transaction_pb";

export class Bid extends jspb.Message { 
    getBidId(): number;
    setBidId(value: number): Bid;


    hasInfo(): boolean;
    clearInfo(): void;
    getInfo(): transaction_pb.TransactionInfo | undefined;
    setInfo(value?: transaction_pb.TransactionInfo): Bid;

    getBidEndDate(): string;
    setBidEndDate(value: string): Bid;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Bid.AsObject;
    static toObject(includeInstance: boolean, msg: Bid): Bid.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Bid, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Bid;
    static deserializeBinaryFromReader(message: Bid, reader: jspb.BinaryReader): Bid;
}

export namespace Bid {
    export type AsObject = {
        bidId: number,
        info?: transaction_pb.TransactionInfo.AsObject,
        bidEndDate: string,
    }
}

export class AddBidResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddBidResp;

    getMessage(): string;
    setMessage(value: string): AddBidResp;


    hasBid(): boolean;
    clearBid(): void;
    getBid(): Bid | undefined;
    setBid(value?: Bid): AddBidResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddBidResp.AsObject;
    static toObject(includeInstance: boolean, msg: AddBidResp): AddBidResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddBidResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddBidResp;
    static deserializeBinaryFromReader(message: AddBidResp, reader: jspb.BinaryReader): AddBidResp;
}

export namespace AddBidResp {
    export type AsObject = {
        success: boolean,
        message: string,
        bid?: Bid.AsObject,
    }
}

export class UpdateBidResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): UpdateBidResp;

    getMessage(): string;
    setMessage(value: string): UpdateBidResp;


    hasBid(): boolean;
    clearBid(): void;
    getBid(): Bid | undefined;
    setBid(value?: Bid): UpdateBidResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateBidResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateBidResp): UpdateBidResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateBidResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateBidResp;
    static deserializeBinaryFromReader(message: UpdateBidResp, reader: jspb.BinaryReader): UpdateBidResp;
}

export namespace UpdateBidResp {
    export type AsObject = {
        success: boolean,
        message: string,
        bid?: Bid.AsObject,
    }
}

export class DeleteBidResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteBidResp;

    getMessage(): string;
    setMessage(value: string): DeleteBidResp;


    hasBid(): boolean;
    clearBid(): void;
    getBid(): Bid | undefined;
    setBid(value?: Bid): DeleteBidResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteBidResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteBidResp): DeleteBidResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteBidResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteBidResp;
    static deserializeBinaryFromReader(message: DeleteBidResp, reader: jspb.BinaryReader): DeleteBidResp;
}

export namespace DeleteBidResp {
    export type AsObject = {
        success: boolean,
        message: string,
        bid?: Bid.AsObject,
    }
}

export class ListBidsByUserIDReq extends jspb.Message { 
    getOwnerId(): number;
    setOwnerId(value: number): ListBidsByUserIDReq;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListBidsByUserIDReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListBidsByUserIDReq): ListBidsByUserIDReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListBidsByUserIDReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListBidsByUserIDReq;
    static deserializeBinaryFromReader(message: ListBidsByUserIDReq, reader: jspb.BinaryReader): ListBidsByUserIDReq;
}

export namespace ListBidsByUserIDReq {
    export type AsObject = {
        ownerId: number,
    }
}

export class ListBidsResp extends jspb.Message { 
    clearBidsList(): void;
    getBidsList(): Array<Bid>;
    setBidsList(value: Array<Bid>): ListBidsResp;
    addBids(value?: Bid, index?: number): Bid;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListBidsResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListBidsResp): ListBidsResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListBidsResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListBidsResp;
    static deserializeBinaryFromReader(message: ListBidsResp, reader: jspb.BinaryReader): ListBidsResp;
}

export namespace ListBidsResp {
    export type AsObject = {
        bidsList: Array<Bid.AsObject>,
    }
}
