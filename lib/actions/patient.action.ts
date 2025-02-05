"use server";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { 
    BUCKET_ID, 
    DATABASE_ID,
    ENDPOINT, 
    PATIENTS_COLLECTION_ID, 
    PROJECT_ID,
    databases,  
    storage, 
    users 
} from "../appwrite.config";
import { CreateUserParams, RegisterUserParams } from "@/types";

// create appwrite user
export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        console.log("User created successfully", newUser);

        return parseStringify(newUser);
    } catch (error: any) {

        if(error && error?.code === 409 ) {
            // Check existing user
            const documents = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return documents.users[0];
        }
        console.error("An error occurred while creating a new user" , error);
    }
}

// GET APPWRITE USER
export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.error("An error occurred while fetching user", error);
    }
}

// REGISTER APPWRITE PATIENT
export const registerPatient = async ({ identificationType, ...patient}: 
RegisterUserParams) => {
    try {
        let file;

        if(identificationType){
            const inputFile = identificationType && InputFile.fromBlob(
                identificationType?.get('blobFile') as Blob,
                identificationType?.get('filename') as string
            )

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENTS_COLLECTION_ID!,
            ID.unique(),
            {
                identificationTypeId: file?.$id ? file.$id : null ,
                identificationTypeUrl: file?.$id ?
                    `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                    : null ,
                    ...patient,
            }
        )

        return parseStringify(newPatient)

    } catch (error) {
        console.log("An error ocurred while creating a mew patient" , error)
    }
}

//GET PATIENT
export const getPatient = async (userId: string) => {
    try{
        const patients = await databases.listDocuments(
            DATABASE_ID!, 
            PATIENTS_COLLECTION_ID!, 
            [Query.equal("userId",[userId])]
        )

        return parseStringify(patients.documents[0])

    }catch (error) {
        console.log("An error ocurred while retrieving the patient details." , error)
    }
}

