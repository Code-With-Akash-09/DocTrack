import { getDoctorById } from "@/actions/doctors";
import { useQuery } from "@tanstack/react-query";

const useGetDoctorById = ({ uid, doctorId }) => {
    return useQuery({
        queryKey: ["getDoctorById", uid, doctorId],
        queryFn: async () => {
            const resp = await getDoctorById(doctorId, uid);

            if (resp.error) {
                throw new Error(resp.message);
            }

            return resp;
        },
        enabled: !!uid && !!doctorId,
        retry: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export default useGetDoctorById;
