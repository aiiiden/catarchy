import { Text, usePwaUpdate, useToast } from "@/features/common";
import { useEffect } from "react";

export function UpdateAlert() {
  const toast = useToast();
  const { needsUpdate, update } = usePwaUpdate();

  useEffect(() => {
    if (!needsUpdate) return;
    toast.push(
      <UpdateAlertContent
        onUpdate={() => {
          toast.dismiss("update-available");
          update();
        }}
        onLater={() => toast.dismiss("update-available")}
      />,
      {
        id: "update-available",
        duration: Infinity,
        hasCloseButton: false,
      },
    );
  }, [toast, needsUpdate, update]);

  return <></>;
}

function UpdateAlertContent({
  onUpdate,
  onLater,
}: {
  onUpdate?: () => void;
  onLater?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 py-2 px-1">
      <Text>Update available! Please refresh the page.</Text>
      <div className="flex justify-end gap-3">
        <button
          className="px-2 py-0.25 border border-white hover:border-dashed active:bg-white active:text-black"
          onClick={onLater}
        >
          <Text boxTrim>Later</Text>
        </button>
        <button
          className="px-2 py-0.25 border border-white bg-white text-black"
          onClick={onUpdate}
        >
          <Text boxTrim>Update</Text>
        </button>
      </div>
    </div>
  );
}
