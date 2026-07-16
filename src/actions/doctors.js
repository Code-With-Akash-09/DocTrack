"use server";

import { doctorscoll, visitcoll } from "@/db/mongodb/collection";
import { endOfMonth, startOfMonth } from "date-fns";
import { nanoid } from "nanoid";

const serializeDoctor = (doctor) => ({
    ...doctor,
    _id: doctor?._id ? doctor._id.toString() : undefined,
    createdAt: doctor?.createdAt ? doctor.createdAt.toISOString() : undefined,
    updatedAt: doctor?.updatedAt ? doctor.updatedAt.toISOString() : undefined,
});

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
            data: {
                _id: result.insertedId.toString(),
            },
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
            data: {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
            },
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
        const visit_coll = await visitcoll();

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

        const [doctors, total] = await Promise.all([
            doctor_coll
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),

            doctor_coll.countDocuments(query),
        ]);

        const startDate = startOfMonth(new Date());
        const endDate = endOfMonth(new Date());

        const doctorIds = doctors.map((doctor) => doctor.doctorId);

        const visits = await visit_coll
            .aggregate([
                {
                    $match: {
                        uid,
                        doctorId: {
                            $in: doctorIds,
                        },
                        visitDate: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: "$doctorId",

                        monthlyVisits: {
                            $sum: 1,
                        },

                        lastVisit: {
                            $max: "$visitDate",
                        },
                    },
                },
            ])
            .toArray();

        const visitMap = new Map();

        visits.forEach((visit) => {
            visitMap.set(visit._id, visit);
        });

        const enrichedDoctors = doctors.map((doctor) => {
            const stats = visitMap.get(doctor.doctorId);
            const monthlyVisits = stats?.monthlyVisits ?? 0;
            return {
                ...doctor,
                monthlyVisits,
                pendingVisits: Math.max(
                    doctor.monthlyTarget - monthlyVisits,
                    0,
                ),
                extraVisits: Math.max(monthlyVisits - doctor.monthlyTarget, 0),
                lastVisit: stats?.lastVisit ?? null,
            };
        });

        return {
            error: false,
            data: enrichedDoctors.map(serializeDoctor),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
            },
            message:
                enrichedDoctors.length > 0
                    ? "Doctors fetched successfully"
                    : "No doctors found",
        };
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return {
            error: true,
            data: [],
            message: error.message || "Failed to fetch doctors",
        };
    }
};

export const getDoctorById = async (doctorId, uid) => {
    try {
        const doctor_coll = await doctorscoll();
        const visit_coll = await visitcoll();

        const doctor = await doctor_coll.findOne({
            doctorId,
            uid,
        });

        if (!doctor) {
            return {
                error: true,
                message: "Doctor not found",
            };
        }

        const startDate = startOfMonth(new Date());
        const endDate = endOfMonth(new Date());

        const [monthlyStats, lastVisit] = await Promise.all([
            visit_coll.countDocuments({
                uid,
                doctorId,
                visitDate: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }),

            visit_coll.findOne(
                {
                    uid,
                    doctorId,
                },
                {
                    sort: {
                        visitDate: -1,
                    },
                },
            ),
        ]);

        const enrichedDoctor = {
            ...doctor,
            monthlyVisits: monthlyStats,
            pendingVisits: Math.max(doctor.monthlyTarget - monthlyStats, 0),
            extraVisits: Math.max(monthlyStats - doctor.monthlyTarget, 0),
            lastVisit: lastVisit?.visitDate ?? null,
        };

        return {
            error: false,
            data: serializeDoctor(enrichedDoctor),
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
