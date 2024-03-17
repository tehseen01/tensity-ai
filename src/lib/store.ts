import { Subscription } from "@prisma/client";
import { create } from "zustand";

type State = {
  activeSubscription: Subscription | null;
  setSubscription: (value: Subscription) => void;
};

export const useSubscription = create<State>()((set) => ({
  activeSubscription: null,
  setSubscription: (value) =>
    set((state) => ({ ...state, activeSubscription: value })),
}));
