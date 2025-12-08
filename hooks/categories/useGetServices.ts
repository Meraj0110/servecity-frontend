// hooks/useGetServices.ts
"use client";

import { create } from "zustand";
import { api } from "@/lib/api";

interface Store {
  services: any[];
  loading: boolean;
  fetchServices: (categoryId: string) => Promise<void>;
}

export const useGetServices = create<Store>((set) => ({
  services: [],
  loading: false,

  async fetchServices(categoryId) {
    set({ loading: true });
    const res = await api.get(`/services/category/${categoryId}`);
    set({ services: res.data?.data, loading: false });
  },
}));
