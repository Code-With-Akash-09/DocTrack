import { getProfile } from "@/actions/auth";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = (uid) => {
    return useQuery({
        queryKey: ["profile", uid],
        queryFn: async () => {
            const { data, message, error } = await getProfile(uid);
            if (error) {
                throw new Error(message);
            }
            return data;
        },
        enabled: !!uid,
        staleTime: 1000 * 60 * 5,
    });
};

export default useGetProfile;
