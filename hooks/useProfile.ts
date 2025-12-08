import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      console.log(data);
      return data; // assuming backend returns { user: {...} }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
