import MonthPicker from "@/components/atoms/monthPicker";
import { Spinner } from "@/components/ui/spinner";
import useGetDoctorVisits from "@/hooks/visits/useGetDoctorVisits";
import { format } from "date-fns";
import { AlarmClockCheck } from "lucide-react";
import { useState } from "react";
import VisitLogForm from "./visitLogForm";

const MonthlyDoctorVisitsAnalytics = ({ doctor }) => {
    const [selectedMonth, setSelectedMonth] = useState(() => new Date());

    const { data: doctorVisits, isLoading } = useGetDoctorVisits({
        uid: doctor?.uid,
        doctorId: doctor?.doctorId,
        date: selectedMonth,
    });

    const summary = doctorVisits?.data?.summary;
    const visits = doctorVisits?.data?.visits;
    const stats = {
        monthlyVisits: summary?.monthlyVisits ?? doctor?.monthlyVisits ?? 0,
        pendingVisits: summary?.pendingVisits ?? doctor?.pendingVisits ?? 0,
        extraVisits: summary?.extraVisits ?? doctor?.extraVisits ?? 0,
    };

    return (
        <div className="flex flex-col gap-6 w-full rounded-lg border border-neutral-100 backdrop:blur-sm bg-white/40 p-4">
            <div className="grid grid-cols-2 gap-4 w-full">
                <MonthPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                />
                <VisitLogForm data={doctor} />
            </div>
            <div className="flex flex-col relative w-full gap-4">
                <span className="text-neutral-600 font-semibold text-xs uppercase">
                    This Month Progress
                </span>
                <DoctorStats stats={stats} />
            </div>
            <div className="flex flex-col relative w-full gap-4">
                <span className="text-neutral-600 font-semibold text-xs uppercase">
                    Visit History Log
                </span>
                <div className="flex flex-col gap-2 w-full">
                    {isLoading ? (
                        <div className="flex w-full items-center justify-center p-4">
                            <Spinner className="size-6! text-green-800" />
                        </div>
                    ) : visits?.length > 0 ? (
                        visits.map((visit) => (
                            <div
                                key={visit._id}
                                className="flex flex-col gap-2 w-full rounded-lg bg-green-50 border border-neutral-100 p-4"
                            >
                                <span className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                                    <AlarmClockCheck className="size-4!" />
                                    {format(new Date(visit.visitDate), "PPp")}
                                </span>
                                <span className="text-xs text-neutral-800 italic">
                                    {visit.comments}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="flex w-full items-center justify-center p-4">
                            <p className="text-sm text-muted-foreground">
                                No visits found.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonthlyDoctorVisitsAnalytics;

const DoctorStats = ({ stats }) => {
    const items = [
        {
            title: "Visits Done",
            value: stats?.monthlyVisits,
        },
        {
            title: "Visits Pending",
            value: stats?.pendingVisits,
        },
        {
            title: "Extra Visits",
            value: stats?.extraVisits,
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            {items.map((item, i) => (
                <DoctorStatsCard key={i} item={item} />
            ))}
        </div>
    );
};

const DoctorStatsCard = ({ item }) => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg bg-green-50 p-2 ring ring-green-600/10">
            <span className="text-2xl font-semibold">{item.value}</span>
            <span className="text-[8px] uppercase text-neutral-700">
                {item.title}
            </span>
        </div>
    );
};
