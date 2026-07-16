"use client";

import { updateDoctor } from "@/actions/doctors";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateDoctor = ({ uid, doctorId }) => {
    return useMutation({
        mutationKey: ["updateDoctor", doctorId, uid],
        mutationFn: async (body) => {
            const resp = await updateDoctor(doctorId, uid, body);

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getDoctors", uid] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export default useUpdateDoctor;
