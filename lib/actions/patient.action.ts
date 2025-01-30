"use server";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { users } from "../appwrite.config";

// create appwrite user
export const createUser = async (user: createUserParams) => {
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

            return documents?.users[0];
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