import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteDoctorById from "@/hooks/doctors/useDeleteDoctorById";
import { Trash2 } from "lucide-react";

const DeleteDoctor = ({ doctor }) => {
    const { mutate: deleteDoctor, isLoading } = useDeleteDoctorById({
        uid: doctor?.uid,
        doctorId: doctor?.doctorId,
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="destructive"
                        size="icon-lg"
                        className={"rounded-md! cursor-pointer"}
                    />
                }
            >
                <Trash2 />
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-md max-w-md mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your doctor from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel size="lg" className="rounded-md">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        size="lg"
                        variant="destructive"
                        className="rounded-md cursor-pointer"
                        disabled={isLoading}
                        onClick={deleteDoctor}
                    >
                        {isLoading ? "Deleting..." : "Continue"}
                        <Trash2 className="size-4! ml-2" />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDoctor;
