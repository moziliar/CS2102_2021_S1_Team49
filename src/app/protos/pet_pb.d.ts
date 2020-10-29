// package: pet
// file: pet.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Pet extends jspb.Message { 
    getPetId(): number;
    setPetId(value: number): Pet;

    getOwnerId(): number;
    setOwnerId(value: number): Pet;


    hasProfile(): boolean;
    clearProfile(): void;
    getProfile(): PetProfile | undefined;
    setProfile(value?: PetProfile): Pet;


    hasCategory(): boolean;
    clearCategory(): void;
    getCategory(): Category | undefined;
    setCategory(value?: Category): Pet;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Pet.AsObject;
    static toObject(includeInstance: boolean, msg: Pet): Pet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Pet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Pet;
    static deserializeBinaryFromReader(message: Pet, reader: jspb.BinaryReader): Pet;
}

export namespace Pet {
    export type AsObject = {
        petId: number,
        ownerId: number,
        profile?: PetProfile.AsObject,
        category?: Category.AsObject,
    }
}

export class PetProfile extends jspb.Message { 
    getPictureUrl(): string;
    setPictureUrl(value: string): PetProfile;

    getName(): string;
    setName(value: string): PetProfile;

    clearSpecialReqsList(): void;
    getSpecialReqsList(): Array<string>;
    setSpecialReqsList(value: Array<string>): PetProfile;
    addSpecialReqs(value: string, index?: number): string;

    getGender(): PetProfile.Gender;
    setGender(value: PetProfile.Gender): PetProfile;

    getDescription(): string;
    setDescription(value: string): PetProfile;

    getDateOfBirth(): string;
    setDateOfBirth(value: string): PetProfile;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PetProfile.AsObject;
    static toObject(includeInstance: boolean, msg: PetProfile): PetProfile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PetProfile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PetProfile;
    static deserializeBinaryFromReader(message: PetProfile, reader: jspb.BinaryReader): PetProfile;
}

export namespace PetProfile {
    export type AsObject = {
        pictureUrl: string,
        name: string,
        specialReqsList: Array<string>,
        gender: PetProfile.Gender,
        description: string,
        dateOfBirth: string,
    }

    export enum Gender {
    MALE = 0,
    FEMALE = 1,
    }

}

export class Category extends jspb.Message { 
    getName(): string;
    setName(value: string): Category;

    getParentCategory(): string;
    setParentCategory(value: string): Category;


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
        name: string,
        parentCategory: string,
    }
}

export class AddPetResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddPetResp;

    getMessage(): string;
    setMessage(value: string): AddPetResp;


    hasPet(): boolean;
    clearPet(): void;
    getPet(): Pet | undefined;
    setPet(value?: Pet): AddPetResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddPetResp.AsObject;
    static toObject(includeInstance: boolean, msg: AddPetResp): AddPetResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddPetResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddPetResp;
    static deserializeBinaryFromReader(message: AddPetResp, reader: jspb.BinaryReader): AddPetResp;
}

export namespace AddPetResp {
    export type AsObject = {
        success: boolean,
        message: string,
        pet?: Pet.AsObject,
    }
}

export class UpdatePetResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): UpdatePetResp;

    getMessage(): string;
    setMessage(value: string): UpdatePetResp;


    hasPet(): boolean;
    clearPet(): void;
    getPet(): Pet | undefined;
    setPet(value?: Pet): UpdatePetResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdatePetResp.AsObject;
    static toObject(includeInstance: boolean, msg: UpdatePetResp): UpdatePetResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdatePetResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdatePetResp;
    static deserializeBinaryFromReader(message: UpdatePetResp, reader: jspb.BinaryReader): UpdatePetResp;
}

export namespace UpdatePetResp {
    export type AsObject = {
        success: boolean,
        message: string,
        pet?: Pet.AsObject,
    }
}

export class DeletePetResp extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeletePetResp;

    getMessage(): string;
    setMessage(value: string): DeletePetResp;


    hasPet(): boolean;
    clearPet(): void;
    getPet(): Pet | undefined;
    setPet(value?: Pet): DeletePetResp;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeletePetResp.AsObject;
    static toObject(includeInstance: boolean, msg: DeletePetResp): DeletePetResp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeletePetResp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeletePetResp;
    static deserializeBinaryFromReader(message: DeletePetResp, reader: jspb.BinaryReader): DeletePetResp;
}

export namespace DeletePetResp {
    export type AsObject = {
        success: boolean,
        message: string,
        pet?: Pet.AsObject,
    }
}
