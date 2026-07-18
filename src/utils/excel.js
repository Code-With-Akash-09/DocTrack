import * as XLSX from "xlsx";

/**
 * Exports JSON data to a standard Excel (.xlsx) file and triggers a browser download.
 * @param {Array<Object>} data The array of objects to export
 * @param {string} filename The name of the file to save
 * @param {string} sheetName The name of the sheet within the workbook
 */
export const exportToExcel = (data, filename = "export.xlsx", sheetName = "Sheet1") => {
    if (!data || data.length === 0) {
        throw new Error("No data available to export");
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, filename);
};
