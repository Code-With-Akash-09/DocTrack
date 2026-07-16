import DoctorForm from "@/components/molecules/doctors/doctorForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const page = () => {
    return (
        <div className="flex h-full flex-col min-h-0 gap-4 w-full flex-1 overflow-hidden p-4">
            <div className="flex items-center justify-between w-full shrink-0">
                <div className="h-fit">
                    <h2 className="leading-none font-semibold">
                        <span className="text-green-700">Doctors</span>{" "}
                        Directory
                    </h2>
                    <span className="text-xs text-neutral-600">Total : 10</span>
                </div>
                <DoctorForm />
            </div>
            <div className="flex w-full shrink-0">
                <Label className="flex items-center w-full gap-2">
                    <Search className="absolute ml-3.5 size-5! text-neutral-400" />
                    <Input
                        type={"text"}
                        className="w-full rounded-md pl-12! h-12!"
                        placeholder="Search doctors..."
                    />
                </Label>
            </div>
            <div className="min-h-0 flex-1 border border-neutral-200 rounded-md w-full"></div>
        </div>
    );
};

export default page;
