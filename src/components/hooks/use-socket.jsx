import { Client } from "webstomp-client";
import { createWithEqualityFn } from "zustand/traditional";


export const useSocket = createWithEqualityFn((set) => ({
    isConnected: false,
	socket: Client,
    setSocket: (socket) => set({ isConnected: true, socket }),
}));
