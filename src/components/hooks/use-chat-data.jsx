import { Client } from "webstomp-client";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const useChatData = createWithEqualityFn(
  devtools((set) => ({
    data: [],
    setData: (data) => set({ data: data }),
    updateData: (data) => set((prev) => ({ data: [...prev.data, data] })),
  }))
);
