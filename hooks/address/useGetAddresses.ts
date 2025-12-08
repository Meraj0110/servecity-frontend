import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useGetAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await api.get("/addresses/all-addresses");
      return data.addresses;
    },
  });
}
