"use client";

import MonthPicker from "@/components/atoms/monthPicker";
import ExcelExporterSuite from "@/components/molecules/analytics/excelExporterSuite";
import MonthlyTargetsReportTable from "@/components/molecules/analytics/monthlyTargetsReportTable";
import useGetMonthlyTargets from "@/hooks/analytics/useGetMonthlyTargets";
import useDOCStore from "@/store";
import { useState } from "react";

const Page = () => {
    const [selectedMonth, setSelectedMonth] = useState(() => new Date());
    const { user: { uid } = null } = useDOCStore();

    const { data: targets, isLoading } = useGetMonthlyTargets({
        uid,
        date: selectedMonth,
    });

    return (
        <div className="flex h-full flex-col min-h-0 gap-4 w-full flex-1 overflow-hidden p-4">
            <div className="flex items-start justify-between gap-4 w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none text-xl font-bold tracking-tight text-neutral-800">
                        <span className="bg-linear-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                            Analytics &
                        </span>{" "}
                        Reports
                    </h2>
                    <p className="text-[10px] text-neutral-500 mt-1">
                        Track visits, export to Excel.
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

            <div className="min-h-0 flex-1 w-full overflow-y-auto overflow-x-hidden hide-scrollbar space-y-6">
                <MonthlyTargetsReportTable
                    targets={targets}
                    isLoading={isLoading}
                    selectedMonth={selectedMonth}
                />

                <ExcelExporterSuite uid={uid} selectedMonth={selectedMonth} />
            </div>
        </div>
    );
};

export default Page;
