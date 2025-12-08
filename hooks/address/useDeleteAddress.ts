import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useDeleteAddress() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: number) => {
      const { data } = await api.post(`/addresses/delete/${addressId}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["addresses"]);
    },
  });
}
