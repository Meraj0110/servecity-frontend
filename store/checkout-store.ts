import { create } from "zustand";
import { CheckoutState, PromoCode } from "@/types/checkout";

interface CheckoutStore extends CheckoutState {
  setStep: (step: number) => void;
  setSelectedAddress: (id: string) => void;
  setSelectedPayment: (id: string) => void;
  setAppliedPromoCode: (promo: PromoCode | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  step: 1,
  selectedAddressId: null,
  selectedPaymentId: null,
  appliedPromoCode: null,
  setStep: (step) => set({ step }),
  setSelectedAddress: (id) => set({ selectedAddressId: id }),
  setSelectedPayment: (id) => set({ selectedPaymentId: id }),
  setAppliedPromoCode: (promo) => set({ appliedPromoCode: promo }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  reset: () =>
    set({
      step: 1,
      selectedAddressId: null,
      selectedPaymentId: null,
      appliedPromoCode: null,
    }),
}));
