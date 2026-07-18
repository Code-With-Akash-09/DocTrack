"use client";

import MonthPicker from "@/components/atoms/monthPicker";
import VisitCard from "@/components/molecules/visit/visitCard";
import { Spinner } from "@/components/ui/spinner";
import useGetVisits from "@/hooks/visits/useGetAllVisits";
import useDOCStore from "@/store";
import { StethoscopeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const DailyLogsPage = () => {
    const { user: { uid } = null } = useDOCStore();
    const { ref, inView } = useInView();
    const [selectedMonth, setSelectedMonth] = useState(() => new Date());

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useGetVisits({
        uid,
        date: selectedMonth,
    });

    const visits = data?.pages?.flatMap((page) => page.data) || [];
    const pagination = data?.pages?.[data.pages.length - 1]?.pagination || {};

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

    return (
        <div className="flex h-full flex-col min-h-0 gap-4 w-full flex-1 overflow-hidden p-4">
            <div className="flex items-start justify-between gap-4 w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none text-xl font-bold tracking-tight text-neutral-800">
                        <span className="bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                            Daily
                        </span>{" "}
                        Logs
                    </h2>
                    <p className="text-[10px] text-neutral-500 mt-1">
                        Total : {!isLoading ? pagination?.total || 0 : 0}
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
            <div className="min-h-0 flex-1 w-full overflow-y-auto overflow-x-hidden hide-scrollbar">
                {isLoading && isFetching ? (
                    <div className="w-full border border-neutral-200 rounded-md flex h-full min-h-0 flex-1 items-center justify-center">
                        <Spinner className="size-6 text-green-700" />
                    </div>
                ) : visits.length === 0 ? (
                    <div className="w-full border border-neutral-200 rounded-md flex flex-col items-center justify-center h-full min-h-0 flex-1">
                        <StethoscopeIcon className="size-20! text-neutral-400" />
                        <span className="text-neutral-400 font-medium mt-4">
                            No visits found
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col w-full gap-4">
                        {visits.map((visit) => (
                            <VisitCard key={visit._id} card={visit} />
                        ))}
                        {visits && visits.length > 0 && (
                            <div ref={ref} className="h-10" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyLogsPage;
