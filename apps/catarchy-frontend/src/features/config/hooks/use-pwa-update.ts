import { useRegisterSW } from "virtual:pwa-register/react";

export function usePwaUpdate() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_, registration) {
      setInterval(() => registration?.update(), 3 * 60 * 1000);
    },
  });

  return {
    needsUpdate: needRefresh,
    update: () => {
      updateServiceWorker(true);
      location.reload();
    },
  };
}
