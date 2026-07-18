"use client";

import BackButton from "@/components/atoms/backButton";
import Badge from "@/components/atoms/badge";
import DeleteDoctor from "@/components/atoms/doctors/deleteDoctor";
import DoctorForm from "@/components/molecules/doctors/doctorForm";
import MonthlyDoctorVisitsAnalytics from "@/components/molecules/doctors/monthlyDoctorVisitsAnalytics";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useGetDoctorById from "@/hooks/doctors/useGetDoctorById";
import { formatTimeRange } from "@/lib/utils";
import useDOCStore from "@/store";
import {
    AlarmClock,
    Calendar,
    ClipboardClock,
    Phone,
    Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const DoctorIdPage = () => {
    const { doctorId } = useParams();
    const { user: { uid } = null } = useDOCStore();
    const { data: doctor, isLoading } = useGetDoctorById({ uid, doctorId });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner className="size-6 text-green-700" />
            </div>
        );
    }

    const isTargetAchieved = doctor?.monthlyVisits >= doctor?.monthlyTarget;

    return (
        <div className="relative flex flex-1 h-full flex-col w-full min-h-0 gap-4 p-4 overflow-hidden max-w-3xl mx-auto">
            <div className="flex items-start justify-between gap-4 w-full shrink-0">
                <div className="flex w-fit">
                    <BackButton />
                </div>
                <div className="flex-1 h-fit">
                    <h2 className="leading-none text-xl font-bold tracking-tight text-neutral-800">
                        <span className="bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                            Doctor
                        </span>{" "}
                        Details
                    </h2>
                    <p className="text-[10px] text-neutral-500 mt-1">
                        Back to List
                    </p>
                </div>
                <div className="flex gap-2 w-fit">
                    <DoctorForm initialValues={doctor} icon />
                    <DeleteDoctor doctor={doctor} />
                </div>
            </div>
            <Separator />

            <div className="flex-1 min-h-0 space-y-5 overflow-y-auto overflow-x-hidden hide-scrollbar w-full pb-6">
                <div className="flex relative w-full p-5 rounded-2xl border border-neutral-100 bg-linear-to-br from-white to-neutral-50/20 shadow-xs overflow-hidden">
                    <Stethoscope className="absolute -right-6 -bottom-6 size-32 text-neutral-100/50 select-none pointer-events-none" />

                    <div className="flex w-full flex-col gap-3 z-10">
                        <div className="flex flex-col gap-2">
                            <Badge
                                variant="green"
                                className="w-fit text-[8px] font-bold uppercase tracking-wider px-2 py-0.5"
                            >
                                {doctor.speciality[0]}
                            </Badge>
                            <div className="flex flex-col gap-1 min-w-0">
                                <h3
                                    className="font-bold leading-tight text-lg text-neutral-800 truncate"
                                    title={doctor.name}
                                >
                                    {doctor.name}
                                </h3>
                                <span
                                    className="text-xs text-neutral-500 truncate"
                                    title={doctor.hospital}
                                >
                                    {doctor.hospital || "General Practice"}
                                </span>
                            </div>
                        </div>

                        {doctor.speciality.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {doctor.speciality.map((item) => (
                                    <Badge
                                        key={item}
                                        variant="green"
                                        className="w-fit text-[8px] uppercase tracking-wide"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <Separator className="bg-neutral-100 mt-1" />

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <Link
                                href={`tel:+91${doctor.mobile}`}
                                className="flex items-center gap-2 p-2 rounded-xl bg-green-50/50 hover:bg-green-50 border border-green-100/50 transition-colors"
                            >
                                <div className="p-1 rounded-md bg-white text-green-700 shadow-2xs shrink-0">
                                    <Phone className="size-3.5" />
                                </div>
                                <span className="text-neutral-700 text-xs font-semibold pr-1">
                                    +91 {doctor.mobile || "N/A"}
                                </span>
                            </Link>

                            <div
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider ${
                                    isTargetAchieved
                                        ? "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                                        : "bg-amber-50/30 border-amber-100/50 text-amber-800"
                                }`}
                            >
                                Target: {doctor.monthlyTarget} visits / Month
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col relative w-full p-5 gap-4 rounded-2xl border border-neutral-100 bg-linear-to-br from-white to-neutral-50/20 shadow-xs">
                    <span className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                        Weekly Schedule
                    </span>

                    <div className="grid grid-cols-2 w-full bg-linear-to-br from-green-50/40 to-emerald-50/20 border border-green-100/50 gap-3 p-3.5 rounded-xl">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-white border border-green-100/50 shrink-0">
                                <Calendar className="size-4 text-green-600" />
                            </div>
                            <div className="flex flex-col text-xs font-bold text-neutral-800 min-w-0">
                                <span className="truncate">
                                    {doctor.visitingDays
                                        .map((day) =>
                                            day.trim().substring(0, 3),
                                        )
                                        .join(", ")}
                                </span>
                                <span className="text-[9px] text-neutral-400 font-normal mt-0.5">
                                    Visiting Days
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-white border border-green-100/50 shrink-0">
                                <AlarmClock className="size-4 text-green-600" />
                            </div>
                            <div className="flex flex-col text-xs font-bold text-neutral-800 min-w-0">
                                <span className="truncate">
                                    {formatTimeRange(
                                        doctor.startTime,
                                        doctor.endTime,
                                    )}
                                </span>
                                <span className="text-[9px] text-neutral-400 font-normal mt-0.5">
                                    Visiting Time
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full bg-linear-to-br from-green-50/40 to-emerald-50/20 border border-green-100/50 gap-3 p-3.5 rounded-xl items-center min-w-0">
                        <div className="p-1.5 rounded-lg bg-white border border-green-100/50 shrink-0">
                            <ClipboardClock className="size-4 text-green-600" />
                        </div>
                        <div className="flex flex-col text-xs font-bold text-neutral-800 min-w-0">
                            <span className="truncate">
                                {doctor.appointmentRequired
                                    ? "Appointment Required"
                                    : "No Appointment Required"}
                            </span>
                            <span className="text-[9px] text-neutral-400 font-normal mt-0.5">
                                Appointment Requirement
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col relative w-full p-5 gap-3 rounded-2xl border border-neutral-100 bg-linear-to-br from-white to-neutral-50/20 shadow-xs">
                    <span className="text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
                        General Notes
                    </span>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                        {doctor.messages ||
                            "No notes available for this doctor."}
                    </p>
                </div>
                <MonthlyDoctorVisitsAnalytics doctor={doctor} />
            </div>
        </div>
    );
};

export default DoctorIdPage;
