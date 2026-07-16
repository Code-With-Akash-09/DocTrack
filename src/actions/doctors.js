"use server";

import { doctorscoll } from "@/db/mongodb/collection";
import { nanoid } from "nanoid";

export const addDoctor = async (uid, body) => {
    try {
        const doctor_coll = await doctorscoll();

        const idDrExists = await doctor_coll.findOne({
            $or: [{ name: body.name }, { mobile: body.mobile }],
        });

        if (idDrExists) {
            return {
                error: true,
                message:
                    "Doctor with the same name or mobile number already exists",
            };
        }

        const data = {
            uid,
            doctorId: nanoid(10),
            ...body,
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await doctor_coll.insertOne(data);

        return {
            error: false,
            data: JSON.parse(
                JSON.stringify({
                    _id: result.insertedId,
                }),
            ),
            message: "Doctor added successfully",
        };
    } catch (error) {
        console.error("Error adding doctor:", error);
        return {
            error: true,
            message: error.message || "Failed to add doctor",
        };
    }
};

export const updateDoctor = async (doctorId, uid, body) => {
    try {
        const doctor_coll = await doctorscoll();

        const idDrExists = await doctor_coll.findOne({
            $or: [{ doctorId: doctorId }, { uid: uid }],
        });

        if (!idDrExists) {
            return {
                error: true,
                message: "Doctor not found",
            };
        }

        const data = {
            ...body,
            updatedAt: new Date(),
        };

        const result = await doctor_coll.updateOne(
            { doctorId: doctorId },
            { $set: data },
        );

        return {
            error: false,
            data: JSON.parse(
                JSON.stringify({
                    matchedCount: result.matchedCount,
                    modifiedCount: result.modifiedCount,
                }),
            ),
            message: "Doctor updated successfully",
        };
    } catch (error) {
        console.error("Error updating doctor:", error);
        return {
            error: true,
            message: error.message || "Failed to update doctor",
        };
    }
};

export const getDoctors = async (
    uid,
    { page = 1, limit = 10, search = "" } = {},
) => {
    try {
        const doctor_coll = await doctorscoll();

        const query = { uid };

        if (search.trim()) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    speciality: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            doctor_coll
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),

            doctor_coll.countDocuments(query),
        ]);

        return {
            error: false,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
            },
            message:
                data.length > 0
                    ? "Doctors fetched successfully"
                    : "No doctors found",
        };
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return {
            error: true,
            message: error.message || "Failed to fetch doctors",
        };
    }
};

export const getDoctorById = async (doctorId, uid) => {
    try {
        const doctor_coll = await doctorscoll();

        const isDrExists = await doctor_coll.findOne({
            $or: [{ doctorId: doctorId }, { uid: uid }],
        });

        if (!isDrExists) {
            return {
                error: true,
                message: "Doctor not found",
            };
        }

        return {
            error: false,
            data: isDrExists,
            message: "Doctor fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching doctor by ID:", error);
        return {
            error: true,
            message: error.message || "Failed to fetch doctor by ID",
        };
    }
};

export const deleteDoctorById = async (doctorId, uid) => {
    try {
        const doctor_coll = await doctorscoll();

        const isDrExists = await doctor_coll.findOne({
            $or: [{ doctorId: doctorId }, { uid: uid }],
        });

        if (!isDrExists) {
            return {
                error: true,
                message: "Doctor not found",
            };
        }

        const result = await doctor_coll.deleteOne({ doctorId: doctorId });

        return {
            error: false,
            data: {
                deletedCount: result.deletedCount,
            },
            message: "Doctor deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return {
            error: true,
            message: error.message || "Failed to delete doctor",
        };
    }
};
