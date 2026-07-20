"use server";

import { doctorscoll, visitcoll } from "@/db/mongodb/collection";
import { endOfMonth, startOfMonth } from "date-fns";

export const getMonthlyTargetsReport = async (uid, date, { page = 1, limit = 0 } = {}) => {
    try {
        const doctor_coll = await doctorscoll();

        const startDate = startOfMonth(new Date(date));
        const endDate = endOfMonth(new Date(date));

        const pipeline = [
            {
                $match: {
                    uid,
                    status: "active",
                },
            },
            {
                $sort: { name: 1 },
            },
        ];

        if (limit > 0) {
            const skip = (page - 1) * limit;
            pipeline.push({ $skip: skip });
            pipeline.push({ $limit: limit });
        }

        pipeline.push(
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
                                        { $eq: ["$doctorId", "$$doctorId"] },
                                        { $eq: ["$uid", "$$uid"] },
                                        { $gte: ["$visitDate", startDate] },
                                        { $lte: ["$visitDate", endDate] },
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
                    _id: 0,
                    doctorId: 1,
                    name: 1,
                    speciality: 1,
                    monthlyTarget: 1,
                    done: { $size: "$visits" },
                },
            }
        );

        const report = await doctor_coll.aggregate(pipeline).toArray();

        const data = report.map((doc) => ({
            ...doc,
            pending: Math.max(doc.monthlyTarget - doc.done, 0),
        }));

        return {
            error: false,
            data,
            pagination: {
                page,
                limit,
                hasNextPage: limit > 0 ? data.length === limit : false,
            },
            message: "Monthly targets report fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching monthly targets report:", error);
        return {
            error: true,
            message: error.message || "Failed to fetch report",
        };
    }
};

export const getExportData = async (uid, type, date) => {
    try {
        const doctor_coll = await doctorscoll();
        const visit_coll = await visitcoll();

        const startDate = startOfMonth(new Date(date));
        const endDate = endOfMonth(new Date(date));

        if (type === "doctors") {
            const doctors = await doctor_coll
                .find({ uid, status: "active" })
                .sort({ name: 1 })
                .toArray();

            const data = doctors.map((doc) => ({
                Name: doc.name,
                Speciality: doc.speciality?.join(", ") || "",
                Hospital: doc.hospital || "",
                Mobile: doc.mobile || "",
                "Monthly Target": doc.monthlyTarget,
                "Visiting Days": doc.visitingDays?.join(", ") || "",
                "Start Time": doc.startTime || "",
                "End Time": doc.endTime || "",
                "Appointment Required": doc.appointmentRequired ? "Yes" : "No",
                Notes: doc.messages || "",
            }));

            return { error: false, data };
        }

        if (type === "monthly-report") {
            const reportResult = await getMonthlyTargetsReport(uid, date);
            if (reportResult.error) throw new Error(reportResult.message);

            const data = reportResult.data.map((doc) => ({
                Doctor: doc.name,
                Speciality: doc.speciality?.join(", ") || "",
                Target: doc.monthlyTarget,
                Done: doc.done,
                Pending: doc.pending,
            }));

            return { error: false, data };
        }

        if (type === "visits-month" || type === "visits-all") {
            const query = { uid };
            if (type === "visits-month") {
                query.visitDate = {
                    $gte: startDate,
                    $lte: endDate,
                };
            }

            const visits = await visit_coll
                .aggregate([
                    { $match: query },
                    { $sort: { visitDate: -1 } },
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
                            _id: 0,
                            visitDate: 1,
                            comments: 1,
                            doctorName: "$doctor.name",
                            speciality: "$doctor.speciality",
                        },
                    },
                ])
                .toArray();

            const data = visits.map((v) => ({
                "Visit Date & Time": v.visitDate
                    ? new Date(v.visitDate).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                      })
                    : "",
                Doctor: v.doctorName || "Unknown",
                Speciality: v.speciality?.join(", ") || "",
                Comments: v.comments || "",
            }));

            return { error: false, data };
        }

        throw new Error("Invalid export type");
    } catch (error) {
        console.error("Error fetching export data:", error);
        return {
            error: true,
            message: error.message || "Failed to fetch export data",
        };
    }
};
