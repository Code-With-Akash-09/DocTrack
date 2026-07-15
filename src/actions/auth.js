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
