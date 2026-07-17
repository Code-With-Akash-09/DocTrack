import { updateVisit } from "@/actions/visits";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateVisits = ({ uid, visitId }) => {
    return useMutation({
        mutationKey: ["updateVisit", uid, visitId],
        mutationFn: async (body) => {
            const resp = await updateVisit(uid, visitId, body);

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getVisits", uid] });
            queryClient.invalidateQueries({ queryKey: ["getDoctors", uid] });
            queryClient.invalidateQueries({
                queryKey: ["getDoctorById", uid, doctorId],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export default useUpdateVisits;
