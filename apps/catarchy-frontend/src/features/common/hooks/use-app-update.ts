import { useRegisterSW } from "virtual:pwa-register/react";

export function useAppUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  function update() {
    updateServiceWorker(true);
  }

  function dismiss() {
    setNeedRefresh(false);
  }

  return { needRefresh, update, dismiss };
}
