import { useHealthCheck } from "../api/use-health-check";

export function ServerStatus() {
  const { data, isLoading, isError } = useHealthCheck();

  const isHealthy = data?.isHealthy;

  if (isLoading) return <p>Checking...</p>;
  if (isError) return <p>Server offline</p>;
  if (isHealthy) return <p>Server online</p>;

  return null;
}
