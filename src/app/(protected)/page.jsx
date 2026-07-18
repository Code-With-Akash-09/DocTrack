"use client";

import { AnimatedCircularProgressBar } from "@/components/atoms/animated-circular-progress-bar";
import Badge from "@/components/atoms/badge";
import MonthPicker from "@/components/atoms/monthPicker";
import StatCard from "@/components/atoms/statCard";
import VisitCard from "@/components/molecules/visit/visitCard";
import VisitLogForm from "@/components/molecules/visit/visitLogForm";
import { Progress } from "@/components/ui/progress";
import useGetDashboard from "@/hooks/home/useGetDashboard";
import useDOCStore from "@/store";
import {
    CircleCheckBig,
    Clock3,
    Stethoscope,
    Target,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";

const HomePage = () => {
    const { user: { uid } = null } = useDOCStore();
    const [selectedMonth, setSelectedMonth] = useState(() => new Date());

    const { data, isLoading, isFetching, refetch } = useGetDashboard({
        uid,
        date: selectedMonth,
    });

    return (
        <div className="flex h-full flex-col min-h-0 gap-4 w-full flex-1 overflow-hidden p-4">
            <div className="grid grid-cols-2 gap-4 w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none text-3xl font-bold">
                        <span className="text-green-700">Dashboard</span>
                    </h2>
                </div>
                <MonthPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    align="end"
                />
            </div>
            <div className="min-h-0 flex-1 w-full space-y-6 overflow-y-auto overflow-x-hidden hide-scrollbar">
                <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="col-span-3">
                        <span className="text-base text-green-800 font-medium">
                            Overview
                        </span>
                    </div>
                    <div className="col-span-3 rounded-2xl border border-neutral-200 bg-white p-6 w-full">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="mb-4 flex items-center gap-3">
                                    <TrendingUp className="size-6 text-green-800" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                                            Monthly Progress
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-neutral-600">
                                    You've completed{" "}
                                    <span className="font-semibold text-neutral-900">
                                        {data?.overview?.totalVisits}
                                    </span>{" "}
                                    out of{" "}
                                    <span className="font-semibold text-neutral-900">
                                        {data?.overview?.targetVisits}
                                    </span>{" "}
                                    planned visits this month.
                                </p>

                                <Progress
                                    value={data?.overview?.completion ?? 0}
                                    className="mt-6 h-3 rounded-full"
                                />
                            </div>

                            <AnimatedCircularProgressBar
                                max={100}
                                min={0}
                                value={data?.overview?.completion ?? 0}
                                gaugePrimaryColor="var(--primary)"
                                gaugeSecondaryColor="var(--secondary)"
                            />
                        </div>
                    </div>
                    {STATS.map((item) => (
                        <StatCard
                            key={item.key}
                            title={item.title}
                            value={data?.overview?.[item.key] ?? 0}
                            icon={item.icon}
                            className={item.className}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="col-span-3">
                        <span className="text-base text-green-800 font-medium">
                            Todays Doctors
                        </span>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        {data?.todayVisits?.length > 0 ? (
                            data?.todayVisits?.map((doctor) => (
                                <div
                                    key={doctor.doctorId}
                                    className="flex flex-col w-full rounded-md p-2 gap-1.5 bg-green-50 border border-green-600/10"
                                >
                                    <Badge
                                        variant={"neutral"}
                                        className={"w-fit text-[8px] uppercase"}
                                    >
                                        {doctor.monthlyVisits} /{" "}
                                        {doctor.monthlyTarget} visits
                                    </Badge>
                                    <div className="flex w-full gap-4">
                                        <div className="flex flex-col gap-0.5 w-full">
                                            <span className="text-sm font-semibold text-neutral-900">
                                                {doctor.name}
                                            </span>
                                            <span className="flex items-center text-medium gap-1 text-[9px]">
                                                <Clock3 className="size-3! text-green-800" />
                                                {doctor.startTime} -{" "}
                                                {doctor.endTime}
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
                            <div className="flex items-center justify-center w-full rounded-md px-4 py-6 gap-1.5 bg-green-50 border border-green-600/10 ">
                                <span className="text-sm text-neutral-800">
                                    No visits scheduled for today.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="col-span-3">
                        <span className="text-base text-green-800 font-medium">
                            Recent Visits
                        </span>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        {data?.recentVisits?.length > 0 ? (
                            data?.recentVisits?.map((visit) => (
                                <VisitCard key={visit.visitId} card={visit} />
                            ))
                        ) : (
                            <div className="flex items-center justify-center w-full rounded-md px-4 py-6 gap-1.5 bg-green-50 border border-green-600/10 ">
                                <span className="text-sm text-neutral-800">
                                    No recent visits.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

const STATS = [
    {
        title: "Doctors",
        key: "totalDoctors",
        icon: Stethoscope,
    },
    {
        title: "Target",
        key: "targetVisits",
        icon: Target,
    },
    {
        title: "Completed",
        key: "totalVisits",
        icon: CircleCheckBig,
    },
    {
        title: "Pending",
        key: "pendingVisits",
        icon: Clock3,
    },
    {
        title: "Extra",
        key: "extraVisits",
        icon: TrendingUp,
        className: "col-span-2",
    },
];

const dummyData = [
    {
        doctorId: "J4ihNzQBa7",
        name: "Dr. Gopichand Patil",
        speciality: ["Cardiology"],
        hospital: "Patil Clinic Care",
        startTime: "10:00",
        endTime: "19:00",
        appointmentRequired: false,
        monthlyTarget: 3,
        monthlyVisits: 2,
        pendingVisits: 1,
        extraVisits: 0,
        progress: 67,
    },
];
