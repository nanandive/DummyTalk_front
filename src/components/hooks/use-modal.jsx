import { createWithEqualityFn } from "zustand/traditional";


export const useModal = createWithEqualityFn((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
