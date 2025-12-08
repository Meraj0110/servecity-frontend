import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddAddress() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/addresses/create", payload);
      return data;
    },

    onSuccess: () => {
      qc.invalidateQueries(["addresses"]);
    },
  });
}
