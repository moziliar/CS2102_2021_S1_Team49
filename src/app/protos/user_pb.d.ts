// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as pet_pb from "./pet_pb";

export class User extends jspb.Message { 
    getUserId(): number;
    setUserId(value: number): User;

    getEmail(): string;
    setEmail(value: string): User;


    hasProfile(): boolean;
    clearProfile(): void;
    getProfile(): UserProfile | undefined;
    setProfile(value?: UserProfile): User;

    getStatus(): User.Status;
    setStatus(value: User.Status): User;

    clearPetsOwnedList(): void;
    getPetsOwnedList(): Array<pet_pb.Pet>;
    setPetsOwnedList(value: Array<pet_pb.Pet>): User;
    addPetsOwned(value?: pet_pb.Pet, index?: number): pet_pb.Pet;


    hasCreditCard(): boolean;
    clearCreditCard(): void;
    getCreditCard(): CreditCard | undefined;
    setCreditCard(value?: CreditCard): User;

    getIsPartTime(): boolean;
    setIsPartTime(value: boolean): User;

    clearLeaveOrAvailList(): void;
    getLeaveOrAvailList(): Array<User.LeaveOrAvail>;
    setLeaveOrAvailList(value: Array<User.LeaveOrAvail>): User;
    addLeaveOrAvail(value?: User.LeaveOrAvail, index?: number): User.LeaveOrAvail;

    clearCategoriesList(): void;
    getCategoriesList(): Array<User.Category>;
    setCategoriesList(value: Array<User.Category>): User;
    addCategories(value?: User.Category, index?: number): User.Category;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        userId: number,
        email: string,
        profile?: UserProfile.AsObject,
        status: User.Status,
        petsOwnedList: Array<pet_pb.Pet.AsObject>,
        creditCard?: CreditCard.AsObject,
        isPartTime: boolean,
        leaveOrAvailList: Array<User.LeaveOrAvail.AsObject>,
        categoriesList: Array<User.Category.AsObject>,
    }


    export class LeaveOrAvail extends jspb.Message { 
        getStartDate(): string;
        setStartDate(value: string): LeaveOrAvail;

        getEndDate(): string;
        setEndDate(value: string): LeaveOrAvail;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): LeaveOrAvail.AsObject;
        static toObject(includeInstance: boolean, msg: LeaveOrAvail): LeaveOrAvail.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: LeaveOrAvail, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): LeaveOrAvail;
        static deserializeBinaryFromReader(message: LeaveOrAvail, reader: jspb.BinaryReader): LeaveOrAvail;
    }

    export namespace LeaveOrAvail {
        export type AsObject = {
            startDate: string,
            endDate: string,
        }
    }

    export class Category extends jspb.Message { 

        hasCategory(): boolean;
        clearCategory(): void;
        getCategory(): pet_pb.Category | undefined;
        setCategory(value?: pet_pb.Category): Category;

        getRate(): number;
        setRate(value: number): Category;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Category.AsObject;
        static toObject(includeInstance: boolean, msg: Category): Category.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Category, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Category;
        static deserializeBinaryFromReader(message: Category, reader: jspb.BinaryReader): Category;
    }

    export namespace Category {
        export type AsObject = {
            category?: pet_pb.Category.AsObject,
            rate: number,
        }
    }


    export enum Status {
    PET_OWNER = 0,
    CARE_TAKER = 1,
    BOTH = 2,
    PCS_ADMIN = 3,
    }

}

export class UserProfile extends jspb.Message { 
    getName(): string;
    setName(value: string): UserProfile;

    getPictureUrl(): string;
    setPictureUrl(value: string): UserProfile;

    getPhone(): number;
    setPhone(value: number): UserProfile;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserProfile.AsObject;
    static toObject(includeInstance: boolean, msg: UserProfile): UserProfile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserProfile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserProfile;
    static deserializeBinaryFromReader(message: UserProfile, reader: jspb.BinaryReader): UserProfile;
}

export namespace UserProfile {
    export type AsObject = {
        name: string,
        pictureUrl: string,
        phone: number,
    }
}

export class CreditCard extends jspb.Message { 
    getCardNumber(): number;
    setCardNumber(value: number): CreditCard;

    getExpiryDate(): string;
    setExpiryDate(value: string): CreditCard;

    getHolderName(): string;
    setHolderName(value: string): CreditCard;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreditCard.AsObject;
    static toObject(includeInstance: boolean, msg: CreditCard): CreditCard.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreditCard, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreditCard;
    static deserializeBinaryFromReader(message: CreditCard, reader: jspb.BinaryReader): CreditCard;
}

export namespace CreditCard {
    export type AsObject = {
        cardNumber: number,
        expiryDate: string,
        holderName: string,
    }
}

export class Paycheck extends jspb.Message { 
    getUserId(): number;
    setUserId(value: number): Paycheck;

    getAmount(): number;
    setAmount(value: number): Paycheck;

    getMonth(): number;
    setMonth(value: number): Paycheck;

    getYear(): number;
    setYear(value: number): Paycheck;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Paycheck.AsObject;
    static toObject(includeInstance: boolean, msg: Paycheck): Paycheck.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Paycheck, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Paycheck;
    static deserializeBinaryFromReader(message: Paycheck, reader: jspb.BinaryReader): Paycheck;
}

export namespace Paycheck {
    export type AsObject = {
        userId: number,
        amount: number,
        month: number,
        year: number,
    }
}

export class LoginReq extends jspb.Message { 
    getEmail(): number;
    setEmail(value: number): LoginReq;

    getPassword(): number;
    setPassword(value: number): LoginReq;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginReq.AsObject;
    static toObject(includeInstance: boolean, msg: LoginReq): LoginReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginReq;
    static deserializeBinaryFromReader(message: LoginReq, reader: jspb.BinaryReader): LoginReq;
}

export namespace LoginReq {
    export type AsObject = {
        email: number,
        password: number,
    }
}

export class LoginResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): LoginResp;

    getMessage(): string;
    setMessage(value: string): LoginResp;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): LoginResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginResp.AsObject;
    static toObject(includeInstance: boolean, msg: LoginResp): LoginResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginResp;
    static deserializeBinaryFromReader(message: LoginResp, reader: jspb.BinaryReader): LoginResp;
}

export namespace LoginResp {
    export type AsObject = {
        success: boolean,
        message: string,
        user?: User.AsObject,
    }
}

export class AddUserResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddUserResp;

    getMessage(): string;
    setMessage(value: string): AddUserResp;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): AddUserResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddUserResp.AsObject;
    static toObject(includeInstance: boolean, msg: AddUserResp): AddUserResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddUserResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddUserResp;
    static deserializeBinaryFromReader(message: AddUserResp, reader: jspb.BinaryReader): AddUserResp;
}

export namespace AddUserResp {
    export type AsObject = {
        success: boolean,
        message: string,
        user?: User.AsObject,
    }
}

export class UpdateUserResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): UpdateUserResp;

    getMessage(): string;
    setMessage(value: string): UpdateUserResp;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): UpdateUserResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserResp): UpdateUserResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserResp;
    static deserializeBinaryFromReader(message: UpdateUserResp, reader: jspb.BinaryReader): UpdateUserResp;
}

export namespace UpdateUserResp {
    export type AsObject = {
        success: boolean,
        message: string,
        user?: User.AsObject,
    }
}

export class DeleteUserResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteUserResp;

    getMessage(): string;
    setMessage(value: string): DeleteUserResp;


    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): DeleteUserResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserResp): DeleteUserResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserResp;
    static deserializeBinaryFromReader(message: DeleteUserResp, reader: jspb.BinaryReader): DeleteUserResp;
}

export namespace DeleteUserResp {
    export type AsObject = {
        success: boolean,
        message: string,
        user?: User.AsObject,
    }
}

export class ListAllCareTakersReq extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListAllCareTakersReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListAllCareTakersReq): ListAllCareTakersReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListAllCareTakersReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListAllCareTakersReq;
    static deserializeBinaryFromReader(message: ListAllCareTakersReq, reader: jspb.BinaryReader): ListAllCareTakersReq;
}

export namespace ListAllCareTakersReq {
    export type AsObject = {
    }
}

export class ListAllCareTakersResp extends jspb.Message { 
    clearCareTakersList(): void;
    getCareTakersList(): Array<User>;
    setCareTakersList(value: Array<User>): ListAllCareTakersResp;
    addCareTakers(value?: User, index?: number): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListAllCareTakersResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListAllCareTakersResp): ListAllCareTakersResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListAllCareTakersResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListAllCareTakersResp;
    static deserializeBinaryFromReader(message: ListAllCareTakersResp, reader: jspb.BinaryReader): ListAllCareTakersResp;
}

export namespace ListAllCareTakersResp {
    export type AsObject = {
        careTakersList: Array<User.AsObject>,
    }
}

export class ListAllPaychecksByCareTakerReq extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListAllPaychecksByCareTakerReq.AsObject;
    static toObject(includeInstance: boolean, msg: ListAllPaychecksByCareTakerReq): ListAllPaychecksByCareTakerReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListAllPaychecksByCareTakerReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListAllPaychecksByCareTakerReq;
    static deserializeBinaryFromReader(message: ListAllPaychecksByCareTakerReq, reader: jspb.BinaryReader): ListAllPaychecksByCareTakerReq;
}

export namespace ListAllPaychecksByCareTakerReq {
    export type AsObject = {
    }
}

export class ListAllPaychecksByCareTakerResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListAllPaychecksByCareTakerResp;

    getMessage(): string;
    setMessage(value: string): ListAllPaychecksByCareTakerResp;

    clearPaychecksList(): void;
    getPaychecksList(): Array<Paycheck>;
    setPaychecksList(value: Array<Paycheck>): ListAllPaychecksByCareTakerResp;
    addPaychecks(value?: Paycheck, index?: number): Paycheck;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListAllPaychecksByCareTakerResp.AsObject;
    static toObject(includeInstance: boolean, msg: ListAllPaychecksByCareTakerResp): ListAllPaychecksByCareTakerResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListAllPaychecksByCareTakerResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListAllPaychecksByCareTakerResp;
    static deserializeBinaryFromReader(message: ListAllPaychecksByCareTakerResp, reader: jspb.BinaryReader): ListAllPaychecksByCareTakerResp;
}

export namespace ListAllPaychecksByCareTakerResp {
    export type AsObject = {
        success: boolean,
        message: string,
        paychecksList: Array<Paycheck.AsObject>,
    }
}
