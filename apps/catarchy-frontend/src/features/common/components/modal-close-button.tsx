import React from "react";
import XIcon from "../assets/x-icon.svg?react";

export const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  return (
    <button type="button" className={className} {...props} ref={ref}>
      <XIcon />
    </button>
  );
});
