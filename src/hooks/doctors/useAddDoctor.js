"use client";

import { addDoctor } from "@/actions/doctors";
import { queryClient } from "@/services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddDoctor = (uid) => {
    return useMutation({
        mutationKey: ["addDoctor", uid],
        mutationFn: async (body) => {
            const resp = await addDoctor(uid, body);

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

export default useAddDoctor;
