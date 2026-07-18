"use client";

import MonthPicker from "@/components/atoms/monthPicker";
import OverviewSection from "@/components/molecules/home/overviewSection";
import RecentVisits from "@/components/molecules/home/recentVisits";
import TodayDoctors from "@/components/molecules/home/todayDoctors";
import useGetDashboard from "@/hooks/home/useGetDashboard";
import useDOCStore from "@/store";
import { useState } from "react";

const HomePage = () => {
    const { user: { uid } = null } = useDOCStore();
    const [selectedMonth, setSelectedMonth] = useState(() => new Date());

    const { data } = useGetDashboard({
        uid,
        date: selectedMonth,
    });

    const todayDoctorsList = data?.todayDoctors || data?.todayVisits || [];
    const recentVisitsList = data?.recentVisits || [];

    return (
        <div className="flex h-full flex-col min-h-0 gap-4 w-full flex-1 overflow-hidden p-4 max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-4 w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none text-2xl font-bold tracking-tight text-neutral-800">
                        <span className="bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                            Your
                        </span>{" "}
                        Dashboard
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                        Track your progress and performance.
                    </p>
                </div>
                <div className="flex w-fit">
                    <MonthPicker
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        align="end"
                    />
                </div>
            </div>

            <div className="min-h-0 flex-1 w-full space-y-6 overflow-y-auto overflow-x-hidden hide-scrollbar pb-6">
                <OverviewSection overview={data?.overview} />
                <TodayDoctors todayDoctors={todayDoctorsList} />
                <RecentVisits recentVisits={recentVisitsList} />
            </div>
        </div>
    );
};

export default HomePage;
