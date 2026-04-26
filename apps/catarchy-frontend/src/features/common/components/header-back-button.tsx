import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { Button } from "./button";

export function HeaderBackButton({ onClick }: { onClick?: () => void }) {
  const router = useRouter();

  const canGoBack = useCanGoBack();

  const handleClick = useCallback(() => {
    if (canGoBack) {
      router.history.back();
    } else {
      router.navigate({
        to: "/",
      });
    }

    onClick?.();
  }, [onClick]);

  return (
    <Button variant={"ghost"} size="small" onClick={handleClick}>
      ⬅
    </Button>
  );
}
