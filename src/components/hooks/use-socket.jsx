import { Client } from "webstomp-client";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from 'zustand/middleware';

export const useSocket = createWithEqualityFn(devtools((set) => ({
    isConnected: false,
	socket: Client,
    setSocket: (socket) => set({ isConnected: true, socket }),
})));
