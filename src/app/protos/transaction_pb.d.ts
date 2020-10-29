// package: transaction
// file: transaction.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";
import * as pet_pb from "./pet_pb";

export class Transaction extends jspb.Message { 
    getTId(): number;
    setTId(value: number): Transaction;


    hasInfo(): boolean;
    clearInfo(): void;
    getInfo(): TransactionInfo | undefined;
    setInfo(value?: TransactionInfo): Transaction;


    hasReview(): boolean;
    clearReview(): void;
    getReview(): Review | undefined;
    setReview(value?: Review): Transaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Transaction.AsObject;
    static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Transaction;
    static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
    export type AsObject = {
        tId: number,
        info?: TransactionInfo.AsObject,
        review?: Review.AsObject,
    }
}

export class TransactionInfo extends jspb.Message { 

    hasOwner(): boolean;
    clearOwner(): void;
    getOwner(): user_pb.User | undefined;
    setOwner(value?: user_pb.User): TransactionInfo;


    hasCareTaker(): boolean;
    clearCareTaker(): void;
    getCareTaker(): user_pb.User | undefined;
    setCareTaker(value?: user_pb.User): TransactionInfo;


    hasPet(): boolean;
    clearPet(): void;
    getPet(): pet_pb.Pet | undefined;
    setPet(value?: pet_pb.Pet): TransactionInfo;

    getLocation(): string;
    setLocation(value: string): TransactionInfo;

    getStartDate(): string;
    setStartDate(value: string): TransactionInfo;

    getEndDate(): string;
    setEndDate(value: string): TransactionInfo;

    getTotalPrice(): number;
    setTotalPrice(value: number): TransactionInfo;

    getTransferMethod(): TransactionInfo.TransferMethod;
    setTransferMethod(value: TransactionInfo.TransferMethod): TransactionInfo;

    getUseCard(): boolean;
    setUseCard(value: boolean): TransactionInfo;


    hasCreditCard(): boolean;
    clearCreditCard(): void;
    getCreditCard(): user_pb.CreditCard | undefined;
    setCreditCard(value?: user_pb.CreditCard): TransactionInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionInfo.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionInfo): TransactionInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionInfo;
    static deserializeBinaryFromReader(message: TransactionInfo, reader: jspb.BinaryReader): TransactionInfo;
}

export namespace TransactionInfo {
    export type AsObject = {
        owner?: user_pb.User.AsObject,
        careTaker?: user_pb.User.AsObject,
        pet?: pet_pb.Pet.AsObject,
        location: string,
        startDate: string,
        endDate: string,
        totalPrice: number,
        transferMethod: TransactionInfo.TransferMethod,
        useCard: boolean,
        creditCard?: user_pb.CreditCard.AsObject,
    }

    export enum TransferMethod {
    PCS_ON_SITE = 0,
    OWNER_DELIVER = 1,
    TAKER_PICKUP = 2,
    }

}

export class Review extends jspb.Message { 
    getDescription(): string;
    setDescription(value: string): Review;

    getRating(): number;
    setRating(value: number): Review;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Review.AsObject;
    static toObject(includeInstance: boolean, msg: Review): Review.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Review, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Review;
    static deserializeBinaryFromReader(message: Review, reader: jspb.BinaryReader): Review;
}

export namespace Review {
    export type AsObject = {
        description: string,
        rating: number,
    }
}

export class ListTnxByUserIDReq extends jspb.Message { 
    getOwnerId(): number;
    setOwnerId(value: number): ListTnxByUserIDReq;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTnxByUserIDReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListTnxByUserIDReq): ListTnxByUserIDReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTnxByUserIDReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTnxByUserIDReq;
    static deserializeBinaryFromReader(message: ListTnxByUserIDReq, reader: jspb.BinaryReader): ListTnxByUserIDReq;
}

export namespace ListTnxByUserIDReq {
    export type AsObject = {
        ownerId: number,
    }
}

export class ListTnxResp extends jspb.Message { 
    clearTransactionsList(): void;
    getTransactionsList(): Array<Transaction>;
    setTransactionsList(value: Array<Transaction>): ListTnxResp;
    addTransactions(value?: Transaction, index?: number): Transaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTnxResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListTnxResp): ListTnxResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTnxResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTnxResp;
    static deserializeBinaryFromReader(message: ListTnxResp, reader: jspb.BinaryReader): ListTnxResp;
}

export namespace ListTnxResp {
    export type AsObject = {
        transactionsList: Array<Transaction.AsObject>,
    }
}
