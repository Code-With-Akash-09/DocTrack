import { updateVisit } from "@/actions/visits";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateVisits = ({ uid, visitId, doctorId }) => {
    return useMutation({
        mutationKey: ["updateVisit", uid, visitId, doctorId],
        mutationFn: async (body) => {
            const resp = await updateVisit(uid, visitId, body);

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["visits", uid],
            });
            queryClient.invalidateQueries({
                queryKey: ["getDoctors", uid],
            });
            queryClient.invalidateQueries({
                queryKey: ["getDoctorById", uid, doctorId],
            });
            queryClient.invalidateQueries({
                queryKey: ["doctor-visits", uid, doctorId],
            });
            queryClient.invalidateQueries({
                queryKey: ["dashboard", uid],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export default useUpdateVisits;
