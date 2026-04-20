import { useShallow } from "zustand/react/shallow";
import { useOverlayStore } from "../stores/overlay";

export function AlertRenderer() {
  const overlays = useOverlayStore(
    useShallow((s) => s.overlays.filter((o) => o.type === "alert")),
  );

  return (
    <>
      {overlays.map((overlay) => (
        <div key={overlay.id}>{overlay.component}</div>
      ))}
    </>
  );
}
