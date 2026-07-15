"use server";

import { adminAuth } from "@/db/firebase/admin";
import { userscoll } from "@/db/mongodb/collection";

export const login = async (token) => {
    const decoded = await adminAuth.verifyIdToken(token);
    const user_coll = await userscoll();

    let user = await user_coll.findOne({ uid: decoded.uid });

    if (!user) {
        const newUser = {
            uid: decoded.uid,
            name: decoded.name,
            email: decoded.email,
            image: decoded.picture,
            provider: "google",
            createdAt: new Date(),
        };

        const result = await user_coll.insertOne(newUser);

        user = {
            _id: result.insertedId,
            ...newUser,
        };
    }

    return JSON.parse(JSON.stringify(user));
};

export const getProfile = async (uid) => {
    try {
        const user_coll = await userscoll();
        const user = await user_coll.findOne({ uid });

        if (!user) {
            return {
                error: true,
                message: "User not found",
            };
        }

        const profile = JSON.parse(JSON.stringify(user));

        return {
            error: false,
            data: profile,
            message: "User profile fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return {
            error: true,
            message: error.message || "Failed to fetch user profile",
        };
    }
};
