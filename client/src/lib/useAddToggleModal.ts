import { create } from 'zustand';

interface AddToggleStore {
  isOpen: boolean;
  toggleModal: () => void;
}

const defaultState = {
  isOpen: false,
};

export const useAddToggleModal = create<AddToggleStore>((set) => ({
  ...defaultState,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
