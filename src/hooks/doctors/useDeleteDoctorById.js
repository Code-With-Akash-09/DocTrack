import { deleteDoctorById } from "@/actions/doctors";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteDoctorById = ({ uid, doctorId }) => {
    return useMutation({
        mutationKey: ["deleteDoctorById", uid, doctorId],

        mutationFn: async () => {
            const resp = await deleteDoctorById(doctorId, uid);

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ["getDoctors", uid],
            });

            const previousDoctors = queryClient.getQueryData([
                "getDoctors",
                uid,
            ]);

            queryClient.setQueryData(["getDoctors", uid], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        data: page.data.filter(
                            (doctor) => doctor._id !== doctorId,
                        ),
                    })),
                };
            });

            return { previousDoctors };
        },

        onError: (error, _, context) => {
            if (context?.previousDoctors) {
                queryClient.setQueryData(
                    ["getDoctors", uid],
                    context.previousDoctors,
                );
            }

            toast.error(error.message);
        },

        onSuccess: (data) => {
            toast.success(data.message);
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["getDoctors", uid],
            });
        },
    });
};

export default useDeleteDoctorById;
