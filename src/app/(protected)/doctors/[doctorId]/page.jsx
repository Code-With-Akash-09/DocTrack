"use client";

import BackButton from "@/components/atoms/backButton";
import DeleteDoctor from "@/components/atoms/doctors/deleteDoctor";
import DoctorForm from "@/components/molecules/doctors/doctorForm";
import { Spinner } from "@/components/ui/spinner";
import useGetDoctorById from "@/hooks/doctors/useGetDoctorById";
import useDOCStore from "@/store";
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
                <BackButton />
                <div className="flex w-fit gap-2">
                    <DoctorForm initialValues={doctor} icon />
                    <DeleteDoctor doctor={doctor} />
                </div>
            </div>
        </div>
    );
};

export default DoctorIdPage;
