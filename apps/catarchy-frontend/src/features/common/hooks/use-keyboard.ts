import { useContext } from "react";

import { KeyboardContext } from "../providers/keyboard-provider";

export function useKeyboard() {
  const context = useContext(KeyboardContext);
  if (context === undefined) {
    throw new Error("useKeyboard must be used within a KeyboardProvider");
  }
  return context;
}
