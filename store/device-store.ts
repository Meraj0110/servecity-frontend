import { create } from "zustand";
import { getOrCreateDeviceId } from "@/lib/device";

type DeviceState = {
  deviceId: string;
  init: () => void;
};

export const useDeviceStore = create<DeviceState>((set) => ({
  deviceId: "",
  init: () =>
    set({ deviceId: getOrCreateDeviceId() }),
}));
