"use client";

import BackButton from "@/components/atoms/backButton";
import Badge from "@/components/atoms/badge";
import DeleteDoctor from "@/components/atoms/doctors/deleteDoctor";
import DoctorForm from "@/components/molecules/doctors/doctorForm";
import MonthlyDoctorVisitsAnalytics from "@/components/molecules/doctors/monthlyDoctorVisitsAnalytics";
import { Button } from "@/components/ui/button";
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

    return (
        <div className="relative flex flex-1 h-full flex-col w-full min-h-0 gap-4 p-4 overflow-hidden">
            <div className="flex shrink-0 justify-between gap-4 w-full">
                <div className="flex items-center w-fit gap-2">
                    <BackButton />
                    <span className="text-green-800 font-semibold text-sm">
                        Back to List
                    </span>
                </div>
                <div className="flex w-fit gap-2">
                    <DoctorForm initialValues={doctor} icon />
                    <DeleteDoctor doctor={doctor} />
                </div>
            </div>
            <Separator />
            <div className="flex-1 min-h-0 space-y-4 overflow-y-auto overflow-x-hidden hide-scrollbar w-full">
                <div className="flex relative w-full p-4 rounded-lg border border-neutral-100 backdrop:blur-sm bg-white/40">
                    <Stethoscope className="z-0 absolute -right-5 size-28! text-neutral-200" />
                    <div className="flex w-full flex-col gap-2 z-10 ">
                        <div className="flex flex-col gap-2">
                            <Badge
                                variant="green"
                                className="w-fit text-[8px] uppercase"
                            >
                                {doctor.speciality[0]}
                            </Badge>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold leading-none text-base">
                                    {doctor.name}
                                </h3>
                                <span className="text-[10px] text-neutral-600">
                                    {doctor.hospital}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            {doctor.speciality.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {doctor.speciality
                                        .slice(0, 3)
                                        .map((item) => (
                                            <Badge
                                                key={item}
                                                variant="green"
                                                className="w-fit text-[8px] uppercase"
                                            >
                                                {item}
                                            </Badge>
                                        ))}

                                    {doctor.speciality.length > 3 && (
                                        <Badge
                                            variant="outline"
                                            className="w-fit text-[8px] uppercase"
                                        >
                                            +{doctor.speciality.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>
                        <Separator className="bg-green-100" />
                        <div className="flex items-center justify-between gap-1">
                            <Button asChild variant="link" className="w-fit">
                                <Link
                                    href={`tel:+91 ${doctor.mobile}`}
                                    className="flex items-center"
                                >
                                    <Phone className="size-4! text-green-800" />
                                    <span className="text-neutral-600 text-sm">
                                        +91 {doctor.mobile}
                                    </span>
                                </Link>
                            </Button>
                            <Badge
                                variant="green"
                                className="w-fit text-[10px] uppercase"
                            >
                                Target : {doctor.monthlyTarget} visits / Month
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col relative w-full p-4 gap-4 rounded-lg border border-neutral-100 backdrop:blur-sm bg-white/40">
                    <span className="text-neutral-600 font-semibold text-xs uppercase">
                        Weekly Schedule
                    </span>
                    <div className="flex flex-row w-full ring bg-green-50 ring-green-600/10 gap-4 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-6! text-green-600" />
                            <div className="flex flex-col text-xs font-semibold text-neutral-800">
                                <span>
                                    {doctor.visitingDays
                                        .map((day) =>
                                            day.trim().substring(0, 3),
                                        )
                                        .join(", ")}
                                </span>
                                <span className="text-[10px] text-neutral-600 font-normal">
                                    Visiting Days
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlarmClock className="size-6! text-green-600" />
                            <div className="flex flex-col text-xs font-semibold text-neutral-800">
                                <span>
                                    {formatTimeRange(
                                        doctor.startTime,
                                        doctor.endTime,
                                    )}
                                </span>
                                <span className="text-[10px] text-neutral-600 font-normal">
                                    Visiting Time
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full bg-green-50 ring ring-green-600/10 gap-4 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                            <ClipboardClock className="size-6! text-green-600" />
                            <div className="flex flex-col text-xs font-semibold text-neutral-800">
                                <span>
                                    {doctor.appointmentRequired
                                        ? "Appointment Required"
                                        : "No Appointment Required"}
                                </span>
                                <span className="text-[10px] text-neutral-600 font-normal">
                                    Appointment Requirement
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col relative w-full p-4 gap-4 rounded-lg border border-neutral-100 backdrop:blur-sm bg-white/40">
                    <span className="text-neutral-600 font-semibold text-xs uppercase">
                        General Notes
                    </span>
                    <p className="text-xs text-neutral-600">
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
