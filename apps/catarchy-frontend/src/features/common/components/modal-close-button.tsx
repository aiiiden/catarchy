import React from "react";
import XIcon from "../assets/x-icon.svg?react";
import { Button } from "./button";

export const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  return (
    <Button
      size={"small"}
      variant={"ghost"}
      type="button"
      className={className}
      {...props}
      ref={ref}
    >
      <XIcon />
    </Button>
  );
});
