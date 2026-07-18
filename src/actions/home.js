"use server";

import { doctorscoll, visitcoll } from "@/db/mongodb/collection";
import { endOfMonth, startOfMonth } from "date-fns";

export const getDashboard = async (uid, { date = new Date() } = {}) => {
    try {
        const doctor_coll = await doctorscoll();
        const visit_coll = await visitcoll();

        const startDate = startOfMonth(new Date(date));
        const endDate = endOfMonth(new Date(date));

        const today = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
        }).format(new Date());

        const [totalDoctors, doctorStats, recentVisits, todayDoctors] =
            await Promise.all([
                doctor_coll.countDocuments({
                    uid,
                    status: "active",
                }),

                doctor_coll
                    .aggregate([
                        {
                            $match: {
                                uid,
                                status: "active",
                            },
                        },
                        {
                            $lookup: {
                                from: "visits",
                                let: {
                                    doctorId: "$doctorId",
                                    uid: "$uid",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: [
                                                            "$doctorId",
                                                            "$$doctorId",
                                                        ],
                                                    },
                                                    {
                                                        $eq: ["$uid", "$$uid"],
                                                    },
                                                    {
                                                        $gte: [
                                                            "$visitDate",
                                                            startDate,
                                                        ],
                                                    },
                                                    {
                                                        $lte: [
                                                            "$visitDate",
                                                            endDate,
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "visits",
                            },
                        },
                        {
                            $project: {
                                doctorId: 1,
                                name: 1,
                                speciality: 1,
                                hospital: 1,
                                monthlyTarget: 1,
                                monthlyVisits: {
                                    $size: "$visits",
                                },
                            },
                        },
                    ])
                    .toArray(),

                visit_coll
                    .aggregate([
                        {
                            $match: {
                                uid,
                                visitDate: {
                                    $gte: startDate,
                                    $lte: endDate,
                                },
                            },
                        },
                        {
                            $sort: {
                                visitDate: -1,
                            },
                        },
                        {
                            $limit: 10,
                        },
                        {
                            $lookup: {
                                from: "doctors",
                                let: {
                                    doctorId: "$doctorId",
                                    uid: "$uid",
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: [
                                                            "$doctorId",
                                                            "$$doctorId",
                                                        ],
                                                    },
                                                    {
                                                        $eq: ["$uid", "$$uid"],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: "doctor",
                            },
                        },
                        {
                            $unwind: "$doctor",
                        },
                    ])
                    .toArray(),

                doctor_coll
                    .find({
                        uid,
                        status: "active",
                        visitingDays: today,
                    })
                    .project({
                        _id: 0,
                        doctorId: 1,
                        name: 1,
                        speciality: 1,
                        hospital: 1,
                        monthlyTarget: 1,
                        startTime: 1,
                        endTime: 1,
                        appointmentRequired: 1,
                        visitingDays: 1,
                    })
                    .sort({
                        startTime: 1,
                    })
                    .toArray(),
            ]);

        let totalTarget = 0;
        let totalVisits = 0;
        let pendingVisits = 0;
        let extraVisits = 0;

        const statsMap = {};

        doctorStats.forEach((doctor) => {
            const pending = Math.max(
                doctor.monthlyTarget - doctor.monthlyVisits,
                0,
            );
            const extra = Math.max(
                doctor.monthlyVisits - doctor.monthlyTarget,
                0,
            );
            const progress =
                doctor.monthlyTarget > 0
                    ? Math.min(
                          Math.round(
                              (doctor.monthlyVisits / doctor.monthlyTarget) *
                                  100,
                          ),
                          100,
                      )
                    : 0;

            statsMap[doctor.doctorId] = {
                monthlyVisits: doctor.monthlyVisits,
                pendingVisits: pending,
                extraVisits: extra,
                progress,
            };

            totalTarget += doctor.monthlyTarget;
            totalVisits += doctor.monthlyVisits;
            pendingVisits += pending;
            extraVisits += extra;
        });

        const completion =
            totalTarget > 0
                ? Math.min(Math.round((totalVisits / totalTarget) * 100), 100)
                : 0;

        const enrichedTodayDoctors = todayDoctors
            .map((doctor) => ({
                ...doctor,
                ...(statsMap[doctor.doctorId] || {
                    monthlyVisits: 0,
                    pendingVisits: doctor.monthlyTarget,
                    extraVisits: 0,
                    progress: 0,
                }),
            }))
            .filter((doctor) => doctor.monthlyVisits < doctor.monthlyTarget);

        return {
            error: false,
            data: {
                overview: {
                    totalDoctors,
                    totalVisits,
                    totalTarget,
                    pendingVisits,
                    extraVisits,
                    completion,
                },
                todayDoctors: JSON.parse(JSON.stringify(enrichedTodayDoctors)),
                recentVisits: JSON.parse(JSON.stringify(recentVisits)),
            },
            message: "Dashboard fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return {
            error: true,
            message:
                error.message ||
                "An error occurred while fetching dashboard data.",
        };
    }
};
