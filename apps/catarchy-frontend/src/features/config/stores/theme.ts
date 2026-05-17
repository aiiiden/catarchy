import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DisplayMode = "default" | "inverted";

type ThemeStore = {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
};

function applyDisplayMode(mode: DisplayMode) {
  document.documentElement.setAttribute("data-theme", mode);
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      displayMode: "default",
      setDisplayMode: (mode) => {
        applyDisplayMode(mode);
        set({ displayMode: mode });
      },
    }),
    {
      name: "catarchy-theme",
      onRehydrateStorage: () => (state) => {
        if (state) applyDisplayMode(state.displayMode);
      },
    },
  ),
);
