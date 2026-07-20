"use client";

import Badge from "@/components/atoms/badge";
import VisitLogForm from "@/components/molecules/visit/visitLogForm";
import { CalendarDays, Clock3 } from "lucide-react";

const TodayDoctors = ({ todayDoctors = [] }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div>
                <span className="text-base text-green-800 font-semibold tracking-tight">
                    Today's Scheduled Doctors
                </span>
            </div>
            <div className="flex w-full flex-col gap-3">
                {todayDoctors.length > 0 ? (
                    todayDoctors.map((doctor) => (
                        <div
                            key={doctor.doctorId}
                            className="flex flex-col w-full rounded-2xl p-4 gap-2.5 bg-linear-to-br from-green-50/50 to-emerald-50/30 border border-green-100/70 hover:shadow-xs transition-all"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <Badge
                                    variant={"green"}
                                    className={
                                        "w-fit text-[9px] font-bold uppercase tracking-wider"
                                    }
                                >
                                    {doctor.monthlyVisits} /{" "}
                                    {doctor.monthlyTarget} Visits Done
                                </Badge>
                                <span className="flex items-center text-[10px] font-medium text-green-700 bg-green-100/50 px-2 py-0.5 rounded-md gap-1">
                                    <Clock3 className="size-3" />
                                    {doctor.startTime} - {doctor.endTime}
                                </span>
                            </div>
                            <div className="flex w-full gap-4 items-center justify-between">
                                <div className="flex flex-col min-w-0">
                                    <span
                                        className="text-sm font-bold text-neutral-800 truncate"
                                        title={doctor.name}
                                    >
                                        {doctor.name}
                                    </span>
                                    <span className="text-[10px] text-neutral-400 mt-0.5 truncate">
                                        {doctor.speciality?.join(", ") ||
                                            "General Practice"}
                                    </span>
                                </div>
                                <VisitLogForm
                                    icon
                                    variant="outline"
                                    size="icon-sm"
                                    data={doctor}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-full rounded-2xl px-4 py-8 gap-2 bg-neutral-50/50 border border-neutral-100">
                        <CalendarDays className="size-8 text-neutral-300" />
                        <span className="text-xs text-neutral-400 font-medium">
                            No visits scheduled for today.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodayDoctors;
