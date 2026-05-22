import React from "react";
import { useShallow } from "zustand/react/shallow";

import { BottomSheet } from "../components/bottom-sheet";
import { useOverlayStore } from "../stores/overlay";

export function BottomSheetRenderer() {
  const overlays = useOverlayStore(
    useShallow((s) => s.overlays.filter((o) => o.type === "bottom-sheet")),
  );
  const remove = useOverlayStore((s) => s.remove);

  return (
    <>
      {overlays.map((overlay) => (
        <BottomSheet
          key={overlay.id}
          isClosing={overlay.closing}
          onClose={() => remove(overlay.id)}
          {...(overlay.props as React.ComponentProps<typeof BottomSheet>)}
        >
          {overlay.component}
        </BottomSheet>
      ))}
    </>
  );
}
