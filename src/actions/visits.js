"use server";

import { doctorscoll, visitcoll } from "@/db/mongodb/collection";
import { endOfMonth, startOfMonth } from "date-fns";
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

export const getDoctorVisitsByMonth = async (uid, doctorId, date) => {
    try {
        const doctor_coll = await doctorscoll();
        const visit_coll = await visitcoll();

        const startDate = startOfMonth(new Date(date));
        const endDate = endOfMonth(new Date(date));

        const [doctor, visits] = await Promise.all([
            doctor_coll.findOne({ uid, doctorId }),
            visit_coll
                .find({
                    uid,
                    doctorId,
                    visitDate: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                })
                .sort({ visitDate: -1 })
                .toArray(),
        ]);

        if (!doctor) {
            return {
                error: true,
                message: "Doctor not found",
            };
        }

        const monthlyVisits = visits.length;
        const pendingVisits = Math.max(doctor.monthlyTarget - monthlyVisits, 0);
        const extraVisits = Math.max(monthlyVisits - doctor.monthlyTarget, 0);

        const progress =
            doctor.monthlyTarget > 0
                ? Math.min(
                      Math.round((monthlyVisits / doctor.monthlyTarget) * 100),
                      100,
                  )
                : 0;

        return {
            error: false,
            data: {
                doctor: JSON.parse(JSON.stringify(doctor)),
                visits: JSON.parse(JSON.stringify(visits)),
                summary: {
                    monthlyTarget: doctor.monthlyTarget,
                    monthlyVisits,
                    pendingVisits,
                    extraVisits,
                    progress,
                },
            },
            message: "Doctor visits fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching doctor visits:", error);
        return {
            error: true,
            message: error.message || "Failed to fetch doctor visits",
        };
    }
};

export const getVisitByUid = async (
    uid,
    { date, page = 1, limit = 10 } = {},
) => {
    try {
        const visit_coll = await visitcoll();

        const startDate = startOfMonth(new Date(date));
        const endDate = endOfMonth(new Date(date));

        const skip = (page - 1) * limit;

        const query = {
            uid,
            visitDate: {
                $gte: startDate,
                $lte: endDate,
            },
        };

        const [visits, total] = await Promise.all([
            visit_coll
                .aggregate([
                    {
                        $match: query,
                    },
                    {
                        $sort: {
                            visitDate: -1,
                        },
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                    {
                        $lookup: {
                            from: "doctors",
                            localField: "doctorId",
                            foreignField: "doctorId",
                            as: "doctor",
                        },
                    },
                    {
                        $unwind: {
                            path: "$doctor",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            visitId: 1,
                            doctorId: 1,
                            uid: 1,
                            visitDate: 1,
                            comments: 1,
                            createdAt: 1,
                            doctor: {
                                doctorId: "$doctor.doctorId",
                                name: "$doctor.name",
                                speciality: "$doctor.speciality",
                                hospital: "$doctor.hospital",
                                mobile: "$doctor.mobile",
                                monthlyTarget: "$doctor.monthlyTarget",
                                appointmentRequired:
                                    "$doctor.appointmentRequired",
                            },
                        },
                    },
                ])
                .toArray(),

            visit_coll.countDocuments(query),
        ]);

        return {
            error: false,
            data: JSON.parse(JSON.stringify(visits)),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1,
            },
            message: "Visits fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching visit by UID:", error);

        return {
            error: true,
            message: error.message || "Failed to fetch visit by UID",
        };
    }
};
