import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useEditAddress() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/addresses/edit", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["addresses"]);
    },
  });
}
