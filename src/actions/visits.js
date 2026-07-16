"use server";

import { visitcoll } from "@/db/mongodb/collection";
import { nanoid } from "nanoid";

export const addVisit = async (uid, doctorId, body) => {
    try {
        const visit_coll = await visitcoll();

        const data = {
            uid,
            doctorId,
            visitId: nanoid(10),
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await visit_coll.insertOne(data);

        return {
            error: false,
            data: {
                _id: result.insertedId.toString(),
            },
            message: "Visit added successfully",
        };
    } catch (error) {
        console.error("Error adding visit:", error);
        return {
            error: true,
            message: error.message || "Failed to add visit",
        };
    }
};

export const updateVisit = async (uid, visitId, body) => {
    try {
        const visit_coll = await visitcoll();

        const isVisitExists = await visit_coll.findOne({
            uid,
            visitId,
        });

        if (!isVisitExists) {
            return {
                error: true,
                message: "Visit not found",
            };
        }

        const data = {
            ...body,
            updatedAt: new Date(),
        };

        const result = await visit_coll.updateOne(
            { uid, visitId },
            { $set: data },
        );

        return {
            error: false,
            data: {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
            },
            message: "Visit updated successfully",
        };
    } catch (error) {
        console.error("Error updating visit:", error);
        return {
            error: true,
            message: error.message || "Failed to update visit",
        };
    }
};
