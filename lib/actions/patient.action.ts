"use server";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { users } from "../appwrite.config";

// create appwrite user
export const createUser = async (user: createUserParams) => {
    try {
        const newuser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name,
        );
        return parseStringify(newuser);
    } catch (error: any) {

        if(error && error?.code === 404 ) {
            const existingUser = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user" , error);
    }
}