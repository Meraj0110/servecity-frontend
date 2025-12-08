import { create } from "zustand";

type CartItem = {
  link: string;
  img: string;
  title: string;
  variant: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));
