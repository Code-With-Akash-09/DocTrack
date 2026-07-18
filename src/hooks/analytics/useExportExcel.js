import { useState } from "react";
import { getExportData } from "@/actions/analytics";
import { exportToExcel } from "@/utils/excel";
import { toast } from "sonner";
import { format } from "date-fns";

const useExportExcel = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [currentExportType, setCurrentExportType] = useState(null);

    const handleExport = async ({ uid, type, date, filename, sheetName }) => {
        if (!uid) return;
        setIsExporting(true);
        setCurrentExportType(type);
        try {
            const formattedDate = date ? format(new Date(date), "MMM_yyyy").toUpperCase() : "";
            let finalFilename = filename;
            if (!finalFilename) {
                if (type === "doctors") finalFilename = "Master_Doctor_List.xlsx";
                else if (type === "monthly-report") finalFilename = `Monthly_Targets_Report_${formattedDate}.xlsx`;
                else if (type === "visits-month") finalFilename = `Selected_Date_Visit_Log_${formattedDate}.xlsx`;
                else if (type === "visits-all") finalFilename = "Full_Historical_Database.xlsx";
            }

            const resp = await getExportData(uid, type, date);
            if (resp.error) {
                throw new Error(resp.message);
            }

            if (resp.data.length === 0) {
                toast.warning("No records found to export.");
                return;
            }

            exportToExcel(resp.data, finalFilename, sheetName || "Report");
            toast.success("Excel exported successfully!");
        } catch (error) {
            console.error("Export failed:", error);
            toast.error(error.message || "Failed to export Excel file");
        } finally {
            setIsExporting(false);
            setCurrentExportType(null);
        }
    };

    return {
        handleExport,
        isExporting,
        currentExportType,
    };
};

export default useExportExcel;
