import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useResendConfirmation() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post("/auth/resend-confirmation", { email });
      return data;
    },
  });
}
