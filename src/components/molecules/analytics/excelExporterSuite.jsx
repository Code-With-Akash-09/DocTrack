"use client";

import useExportExcel from "@/hooks/analytics/useExportExcel";
import {
    Calendar,
    ChevronRight,
    Database,
    Download,
    Loader2,
    TrendingUp,
    Users,
} from "lucide-react";

const ExcelExporterSuite = ({ uid, selectedMonth }) => {
    const { handleExport, isExporting, currentExportType } = useExportExcel();

    const exporters = [
        {
            id: "doctors",
            title: "Master Doctor List",
            desc: "Contact information, targets & schedules",
            icon: Users,
        },
        {
            id: "monthly-report",
            title: "Monthly Targets Report",
            desc: "Calculated completion matrix for chosen month",
            icon: TrendingUp,
        },
        {
            id: "visits-month",
            title: "Selected Date Visit Log",
            desc: "Visits logged for selected date filter",
            icon: Calendar,
        },
        {
            id: "visits-all",
            title: "Full Historical Database",
            desc: "Every recorded log since account genesis",
            icon: Database,
        },
    ];

    return (
        <div className="w-full bg-white border border-neutral-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-50">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-green-50 text-green-700">
                        <Download className="size-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-800 text-sm">
                            Excel Exporter Suite
                        </h3>
                        <p className="text-[10px] text-neutral-400">
                            Export doctor directory, schedules, and historical
                            records
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-4 grid gap-3">
                {exporters.map((exporter) => {
                    const Icon = exporter.icon;
                    const isButtonExporting =
                        isExporting && currentExportType === exporter.id;

                    return (
                        <button
                            key={exporter.id}
                            type="button"
                            disabled={isExporting}
                            onClick={() =>
                                handleExport({
                                    uid,
                                    type: exporter.id,
                                    date: selectedMonth,
                                })
                            }
                            className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-100 hover:border-green-100 hover:bg-green-50/20 active:bg-green-50/40 disabled:opacity-50 disabled:cursor-not-allowed group transition-all text-left w-full cursor-pointer"
                        >
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="p-2.5 rounded-xl bg-neutral-50 group-hover:bg-green-50 text-neutral-500 group-hover:text-green-700 transition-colors shrink-0">
                                    {isButtonExporting ? (
                                        <Loader2 className="size-5 animate-spin" />
                                    ) : (
                                        <Icon className="size-5" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-neutral-800 text-xs sm:text-sm group-hover:text-green-800 transition-colors truncate">
                                        {exporter.title}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors mt-0.5 truncate">
                                        {exporter.desc}
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="size-5 text-neutral-300 group-hover:text-green-600 transition-colors shrink-0" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ExcelExporterSuite;
