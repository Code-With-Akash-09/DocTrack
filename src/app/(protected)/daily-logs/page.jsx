"use client";

import MonthPicker from "@/components/atoms/monthPicker";
import VisitCard from "@/components/molecules/visit/visitCard";
import { Spinner } from "@/components/ui/spinner";
import useGetVisits from "@/hooks/visits/useGetAllVisits";
import useDOCStore from "@/store";
import { StethoscopeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const page = () => {
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
            <div className="grid grid-cols-2 gap-4 w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none font-semibold">
                        <span className="text-green-700">Visit</span> Logs
                    </h2>
                    <span className="text-xs text-neutral-600">
                        Total : {!isLoading ? pagination?.total || 0 : 0}
                    </span>
                </div>
                <MonthPicker
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    align="end"
                />
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

export default page;
