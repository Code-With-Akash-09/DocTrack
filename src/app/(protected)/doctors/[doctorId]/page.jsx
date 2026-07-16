"use client";

import DoctorForm from "@/components/molecules/doctors/doctorForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useGetDoctorById from "@/hooks/doctors/useGetDoctorById";
import useDOCStore from "@/store";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

const DoctorIdPage = () => {
    const { doctorId } = useParams();
    const { user: { uid } = null } = useDOCStore();
    const { data: doctor, isLoading } = useGetDoctorById({ uid, doctorId });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner className="size-6 text-green-700" />
            </div>
        );
    }

    return (
        <div className="relative flex flex-col w-full min-h-0 gap-4 p-4 overflow-hidden">
            <div className="flex justify-between gap-4 w-full">
                <Button
                    variant="outline"
                    className="rounded-md!"
                    size="icon-lg"
                >
                    <ArrowLeft className="size-4!" />
                </Button>
                <div className="flex w-fit gap-4">
                    <DoctorForm initialValues={doctor} icon />
                </div>
            </div>
        </div>
    );
};

export default DoctorIdPage;
