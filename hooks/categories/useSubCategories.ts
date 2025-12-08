// hooks/useSubCategories.ts
"use client";

import { create } from "zustand";
import { api } from "@/lib/api";

export interface SubCategory {
  id: string;
  title: string;
  iconUrl: string;
}

interface Store {
  subcategories: SubCategory[];
  loading: boolean;
  fetchSubcategories: (categoryId: string) => Promise<void>;
}

export const useSubCategories = create<Store>((set) => ({
  subcategories: [],
  loading: false,

  async fetchSubcategories(categoryId) {
    set({ loading: true });
    const res = await api.get(`/subcategories?categoryId=${categoryId}`);
    set({ subcategories: res.data?.data, loading: false });
  },
}));
